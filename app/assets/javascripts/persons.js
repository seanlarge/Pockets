$(document).ready(function() {
    //todo dynamic configuration
    config.nodeTypes = { type : ["User","Person"]}
    config.nodeCaption=function(n) {return n.name || n.title;};
    config.edgeCaption={"caption":["KNOWS"]};
    config.nodeMouseOver = function(n) {return n.id + "<br/>"+n.name || n.title;};


    config.neo4jUrl= "http://localhost:7474/db/data";
    new Cy2Neo(config,"graph","cypher","execute", function() { return $("#neo4jUrl").val(); });
  });