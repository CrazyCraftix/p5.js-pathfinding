var selectedPathNodes = [];
var pathConnections = [];

function findPath()
{
  if(selectedPathNodes.length < 2)
  {
    pathConnections.length = 0;
    return;
  }

  recalculateConnectionCosts();
  pathConnections.length = 0;






  for(var J = 0; J < selectedPathNodes.length-1; J++)
  {
    for(var i = 0; i < nodes.length; i++)
    {
      nodes[i].shortestDistance = Infinity;
      nodes[i].previousNode = -1;
    }


    var shortest = Infinity;
    var priorityQueue = [];

    nodes[selectedPathNodes[J]].shortestDistance = 0;
    for(var i = 0; i < nodes.length; i++)
      priorityQueue.push(i);



    do
    {
      shortest = 0;
      for(var i = 0; i < priorityQueue.length; i++)
      {
        if(nodes[priorityQueue[i]].shortestDistance < nodes[priorityQueue[shortest]].shortestDistance)
          shortest = i;
      }
      if(priorityQueue[shortest] == selectedPathNodes[J+1]) break;

      if(nodes[priorityQueue[shortest]].shortestDistance == Infinity) break;

      for(var i = 0; i < nodes[priorityQueue[shortest]].connections.length; i++)
      {
        if(globalConnections[nodes[priorityQueue[shortest]].connections[i]].nodeOneIndex == priorityQueue[shortest])
        {
          if(nodes[priorityQueue[shortest]].shortestDistance + globalConnections[nodes[priorityQueue[shortest]].connections[i]].cost <
          nodes[globalConnections[nodes[priorityQueue[shortest]].connections[i]].nodeTwoIndex].shortestDistance)
          {
            nodes[globalConnections[nodes[priorityQueue[shortest]].connections[i]].nodeTwoIndex].shortestDistance =
            nodes[priorityQueue[shortest]].shortestDistance + globalConnections[nodes[priorityQueue[shortest]].connections[i]].cost;

            nodes[globalConnections[nodes[priorityQueue[shortest]].connections[i]].nodeTwoIndex].previousNode = priorityQueue[shortest];
          }
        }
        else
        {
          if(nodes[priorityQueue[shortest]].shortestDistance + globalConnections[nodes[priorityQueue[shortest]].connections[i]].cost <
          nodes[globalConnections[nodes[priorityQueue[shortest]].connections[i]].nodeOneIndex].shortestDistance)
          {
            nodes[globalConnections[nodes[priorityQueue[shortest]].connections[i]].nodeOneIndex].shortestDistance =
            nodes[priorityQueue[shortest]].shortestDistance + globalConnections[nodes[priorityQueue[shortest]].connections[i]].cost;

            nodes[globalConnections[nodes[priorityQueue[shortest]].connections[i]].nodeOneIndex].previousNode = priorityQueue[shortest];
          }
        }
      }
      priorityQueue.splice(shortest, 1);
      //console.log("jetzt");
    } while(priorityQueue.length > 0);

  //console.log("hier");

    var endNode = selectedPathNodes[J+1];

     while(nodes[endNode].previousNode != -1)
     {
      for(var i = 0; i < nodes[endNode].connections.length; i++)
      {
        //console.log(nodes[endNode].previousNode);
        if(globalConnections[nodes[endNode].connections[i]].nodeOneIndex == nodes[endNode].previousNode)
        {
          pathConnections.push(nodes[endNode].connections[i]);
          //break;
        }
        else if(globalConnections[nodes[endNode].connections[i]].nodeTwoIndex == nodes[endNode].previousNode)
        {
          pathConnections.push(nodes[endNode].connections[i]);
          //break;
        }
      }
      endNode = nodes[endNode].previousNode;
    }
  }


}

function recalculateConnectionCosts()
{
  for(var i = 0; i < globalConnections.length; i++)
  {
    globalConnections[i].cost = sqrt(sq(nodes[globalConnections[i].nodeOneIndex].x-nodes[globalConnections[i].nodeTwoIndex].x)+
                                     sq(nodes[globalConnections[i].nodeOneIndex].y-nodes[globalConnections[i].nodeTwoIndex].y));
  }
}
