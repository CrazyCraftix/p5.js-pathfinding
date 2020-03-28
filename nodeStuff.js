//-------------------------------------
/*const nodeColor;
const connectionColor;
const selectedColor;*/
//-------------------------------------

const defaultNodeDiameter = 25;
const smallestNodeDiameter = 2;
var lastNodeDiameter = defaultNodeDiameter;

const defaultNodeStrokeWeight = 1;
const smallestNodeStrokeWeight = 1;

const defaultLineStrokeWeight = 1;
const smallestLineStrokeWeight = 1;

var selected = [[/*nodes*/],[/*connections*/]];
var nodes = [];
var globalConnections = [];

//------------------------------------------------------------------------------

function removeConnection(_connectionIndex)
{
  if(_connectionIndex < 0 || _connectionIndex >= globalConnections.length) return;

  for(var i = 0; i < nodes.length; i++)
  {
    for(var j = 0; j < nodes[i].connections.length; j++)
    {
      if(nodes[i].connections[j] == _connectionIndex)
      {
        nodes[i].connections.splice(j, 1);
        j--;
      }
      else if(nodes[i].connections[j] > _connectionIndex)
      {
        nodes[i].connections[j]--;
      }
    }
  }
  for(var i = 0; i < selected[1].length; i++)
  {
    if(selected[1][i] == _connectionIndex)
    {
      selected[1].splice(i, 1);
      i--;
    }
    else if(selected[1][i] > _connectionIndex)
      selected[1][i]--;
  }

  globalConnections.splice(_connectionIndex, 1);
}

function removeNode(_nodeIndex)
{
  if(_nodeIndex < 0 || _nodeIndex >= nodes.length) return;

  for(var i = 0; i < nodes[_nodeIndex].connections.length+i; i++)
    removeConnection(nodes[_nodeIndex].connections[0]);

  for(var i = 0; i < globalConnections.length; i++)
  {
    if(globalConnections[i].nodeOneIndex > _nodeIndex)
      globalConnections[i].nodeOneIndex--;
    if(globalConnections[i].nodeTwoIndex > _nodeIndex)
      globalConnections[i].nodeTwoIndex--;
  }

  for(var i = 0; i < selected[0].length; i++)
    if(selected[0][i] > _nodeIndex)
      selected[0][i]--;

  nodes.splice(_nodeIndex, 1);
}

function addNode(_x, _y, _diameter = lastNodeDiameter, _strokeWeight = defaultNodeStrokeWeight)
{
  if(_diameter < smallestNodeDiameter) _diameter = smallestNodeDiameter;
  if(_strokeWeight < smallestNodeStrokeWeight) _strokeWeight = smallestNodeStrokeWeight;

  nodes.push(new NODE(_x, _y, _diameter, _strokeWeight));
}

function linkNodes(_nodeA, _nodeB, _cost = -1, _type = 0, _strokeWeight = defaultLineStrokeWeight)
{
  if(_nodeA >= nodes.length || _nodeB >= nodes.length || _nodeA == _nodeB) return;
  if(_type != 0 && _type != 1) return;
  globalConnections.push(new CONNECTION(_nodeA, _nodeB, _cost, _type, _strokeWeight));

  nodes[_nodeA].connections.push(globalConnections.length-1);
  if(_type == 0)
    nodes[_nodeB].connections.push(globalConnections.length-1);
}

function nodeNetOut()
{
  findPath();
  strokeWeight(defaultLineStrokeWeight/(img.width/imgWidth));
  for(var i = 0; i < globalConnections.length; i++)
  {
    stroke(connectionColor);

    for(var j = 0; j < pathConnections.length; j++)
      if(i == pathConnections[j])
      {
        stroke(pathColor);
        break;
      }

    for(var j = 0; j < selected[1].length; j++)
      if(selected[1][j] == i) stroke(selectedColor);

    line(nodes[globalConnections[i].nodeOneIndex].x, nodes[globalConnections[i].nodeOneIndex].y,
         nodes[globalConnections[i].nodeTwoIndex].x, nodes[globalConnections[i].nodeTwoIndex].y);
  }

  stroke(0);
  strokeWeight(defaultNodeStrokeWeight/(img.width/imgWidth));
  for(var i = 0; i < nodes.length; i++)
  {
    fill(nodeColor);

    for(var j = 0; j < selectedPathNodes.length; j++)
      if(i == selectedPathNodes[j])
      {
        fill(pathNodeColor);
        break;
      }

    for(var j = 0; j < selected[0].length; j++)
      if(selected[0][j] == i) fill(selectedColor);

    ellipse(nodes[i].x, nodes[i].y, nodes[i].diameter/(img.width/imgWidth));
  }
}

function checkForNode(_x, _y)
{
  for(var i = nodes.length-1; i >= 0; i--)
    if(sqrt(sq(_x-nodes[i].x)+sq(_y-nodes[i].y)) <= nodes[i].diameter/(img.width/imgWidth)/2)
      return i;
  return -1;
}

/*function checkForConnection(_x, _y)
{
  return -1;
}*/
