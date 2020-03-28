class CONNECTION
{
  constructor(_nodeOneIndex, _nodeTwoIndex, _cost, _type, _strokeWeight)
  {
    this.nodeOneIndex = _nodeOneIndex;
    this.nodeTwoIndex = _nodeTwoIndex;
    if(_cost == -1)
      this.cost = sqrt(sq(nodes[_nodeOneIndex].x-nodes[_nodeTwoIndex].x)+sq(nodes[_nodeOneIndex].y-nodes[_nodeTwoIndex].y));
    else
      this.cost = _cost;
    this.type = _type;
    //      0 = 2-way-connection
    //      1 = 1-way-connection

    this.strokeWeight = _strokeWeight;

  }
}
