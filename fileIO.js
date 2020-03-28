var gotImageCount = -1;
var imageData = '';

function fileDropped(_file)
{
  if(_file.type == "image")
  {
    gotImageCount = -1;
    img = loadImage(_file.data, gotImage());
    imageData = _file.data;
    showImage = true;
  }
  else if(_file.type == "text")
  {
    gotTextAsInput(_file.data);
  }
}

function gotTextAsInput(text) {
	console.log(text);
    selected[0].length = 0;
    selected[1].length = 0;

    selectedPathNodes.length = 0;
    linkingNode = -1;
    draggedNode = -1;

    nodes.length = 0;
    globalConnections.length = 0;

    var data = [""];
    for(var i = 0; i < text.length; i++)
      if(text[i] != ',')
        data[data.length-1] = data[data.length-1] + text[i];
      else
        data.push("");

    data = float(data);

    var i = 1;
    for(var a = 0; a < data[0]; a++)
    {
      addNode(data[i], data[i+1], data[i+2], data[i+3]);
      i += 4;
      /*for(var f = 0; f < data[i]; f++)
      {
        nodes[nodes.length-1].connections.push(data[i+1+f]);
      }*/
      i += data[i];
      i++;
    }
    j = i;
    i++;
    for(var a = 0; a < data[j]; a++)
    {
      linkNodes(data[i], data[i+1], data[i+2], data[i+3], data[i+4]);
      i += 5;
    }
    adjustNodePositions(data[i], data[i+1]);
}







function gotImage()
{
  gotImageCount = 0;
}











function saveScene()
{
  var writer = createWriter("pathFindingSave.txt");
  writer.write(nodes.length);
  for(var i = 0; i < nodes.length; i++)
  {
    writer.write(',' + nodes[i].x);
    writer.write(',' + nodes[i].y);
    writer.write(',' + nodes[i].diameter);
    writer.write(',' + nodes[i].strokeWeight);

    writer.write(',' + nodes[i].connections.length);
    for(var j = 0; j < nodes[i].connections.length; j++)
      writer.write(',' + nodes[i].connections[j]);
  }
  writer.write(',' + globalConnections.length);
  for(var i = 0; i < globalConnections.length; i++)
  {
    writer.write(',' + globalConnections[i].nodeOneIndex);
    writer.write(',' + globalConnections[i].nodeTwoIndex);
    writer.write(',' + globalConnections[i].cost);
    writer.write(',' + globalConnections[i].type);
    writer.write(',' + globalConnections[i].strokeWeight);
  }
  writer.write(',' + imgWidth + ',' + imgHeight);

  writer.close();
}
