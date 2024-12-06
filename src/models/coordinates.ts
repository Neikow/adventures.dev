export class Coordinates {
  constructor(
    public latitude: number,
    public longitude: number,
  ) {}

  distanceTo(other: Coordinates) {
    const R = 6371e3; // metres
    const phi1 = (this.latitude * Math.PI) / 180; // φ, λ in radians
    const phi2 = (other.latitude * Math.PI) / 180;
    const deltaPhi = ((this.latitude - other.latitude) * Math.PI) / 180;
    const deltaLambda = ((this.longitude - other.longitude) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(deltaLambda / 2) *
        Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in metres
  }

  format() {
    return `${this.latitude.toFixed(4)}° N, ${this.longitude.toFixed(4)}° E`;
  }
}
