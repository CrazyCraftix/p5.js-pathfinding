class NODE
{
  constructor(_x, _y, _diameter, _strokeWeight)
  {
    this.x = _x;
    this.y = _y;
    this.diameter = _diameter;
    this.strokeWeight = _strokeWeight;

    this.connections = [ /*globalConnectionsIndex*/ ];

    this.shortestDistance = Infinity;
    this.previousNode = -1;
  }
}
