const toRad = num => (num * Math.PI) / 180;

export function getBoundingBox(pLatitude, pLongitude, pDistanceInMeters) {
  var latRadian = toRad(pLatitude);

  var degLatKm = 110.574235;
  var degLongKm = 110.572833 * Math.cos(latRadian);
  var deltaLat = pDistanceInMeters / 1000.0 / degLatKm;
  var deltaLong = pDistanceInMeters / 1000.0 / degLongKm;

  var topLat = pLatitude + deltaLat;
  var bottomLat = pLatitude - deltaLat;
  var leftLng = pLongitude - deltaLong;
  var rightLng = pLongitude + deltaLong;

  return {
    north: topLat,
    east: rightLng,
    south: bottomLat,
    west: leftLng
  };
}
