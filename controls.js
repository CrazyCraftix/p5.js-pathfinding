var draggedNode = -1;
var draggedNodeDistX = -1, draggedNodeDistY = -1;
var lastDraggedX = '', lastDraggedY = '';

function dragNode()
{
  if(draggedNode == -2) return;
  if(mouseButton != LEFT)
  {
    lastDraggedX = globalPosX();
    lastDraggedY = globalPosY();
    return;
  }

  if(draggedNode == -1)
  {
    lastDraggedX = globalPosX();
    lastDraggedY = globalPosY();
    var onThisNode = checkForNode(globalPosX(), globalPosY());
    if(onThisNode != -1) // on node
    {
      draggedNode = onThisNode;
      draggedNodeDistX = globalPosX()-nodes[draggedNode].x;
      draggedNodeDistY = globalPosY()-nodes[draggedNode].y;
    }
    else
    {
      draggedNode = -2;
      return;
    }
  }
  if(!(keyIsPressed && keyCode == SHIFT))
    for(var i = 0; i < selected[0].length; i++)
      if(draggedNode == selected[0][i])
      {
        for(var j = 0; j < selected[0].length; j++)
        {
          nodes[selected[0][j]].x += (globalPosX()-draggedNodeDistX)-lastDraggedX+draggedNodeDistX;
          nodes[selected[0][j]].y += (globalPosY()-draggedNodeDistY)-lastDraggedY+draggedNodeDistY;
        }
        lastDraggedX = globalPosX();
        lastDraggedY = globalPosY();
        return;
      }
  nodes[draggedNode].x += (globalPosX()-draggedNodeDistX)-lastDraggedX+draggedNodeDistX;
  nodes[draggedNode].y += (globalPosY()-draggedNodeDistY)-lastDraggedY+draggedNodeDistY;
  lastDraggedX = globalPosX();
  lastDraggedY = globalPosY();
}

function resizeNodes(_scrollAmount)
{
  _scrollAmount /= 50;
  var onThisNode = checkForNode(globalPosX(), globalPosY());
  if(onThisNode != -1) // on node
  {
    for(var i = 0; i < selected[0].length; i++)
      if(onThisNode == selected[0][i])
      {
        for(var j = 0; j < selected[0].length; j++)
        {
          nodes[selected[0][j]].diameter += _scrollAmount;
          if(nodes[selected[0][j]].diameter < smallestNodeDiameter)
            nodes[selected[0][j]].diameter = smallestNodeDiameter;
        }
        return;
      }
    nodes[onThisNode].diameter += _scrollAmount;
    if(nodes[onThisNode].diameter < smallestNodeDiameter)
      nodes[onThisNode].diameter = smallestNodeDiameter;
    lastNodeDiameter = nodes[onThisNode].diameter;
  }
}
