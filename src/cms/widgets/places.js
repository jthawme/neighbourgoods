import React, { useCallback } from "react";
import styled from "styled-components";

const LabelTitle = styled.span`
  display: block;
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid grey;
  border-radius: 4px;
  display: block;

  width: 100%;
`;

const Container = styled.div`
  padding: 10px;

  border: 2px solid grey;
  border-radius: 4px;

  margin-bottom: 20px;
`;

const Button = styled.button`
  border-radius: 4px;

  background-color: grey;
  color: white;

  padding: 10px;

  border: 0;
  outline: 0;
`;

const ValueContainer = styled.div`
  color: ${props => (props.error ? "red" : "green")};

  font-size: 18px;

  margin: 10px 0;
`;

class PlacesInfoHelper extends React.Component {
  onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const placeid = new FormData(form).get("placeid");

    fetch(`/.netlify/functions/places?placeId=${placeid}`)
      .then(resp => resp.json())
      .then(data => {
        window.test = data;
        // this.props.onChange(data);
      });
  };

  render() {
    const { value } = this.props;

    return (
      <Container>
        <form onSubmit={this.onSubmit}>
          <Label>
            <LabelTitle>
              Find this here:{" "}
              <a
                href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder"
                target="_blank"
              >
                Place ID Finder
              </a>
            </LabelTitle>
            <Input
              name="placeid"
              type="text"
              placeholder="Google maps place id"
              defaultValue={value ? value.get("place_id") : ""}
            />
          </Label>
          <Button type="submit">Search</Button>
        </form>

        {value && Object.keys(value).length ? (
          <ValueContainer>HAS VALUE!</ValueContainer>
        ) : (
          <ValueContainer error>No value yet</ValueContainer>
        )}
      </Container>
    );
  }
}

export default PlacesInfoHelper;
