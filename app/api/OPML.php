<?php
class OPML {
  // Set the file
  const file = 'Data/export.opml';

  public function append($name, $description, $category) {
  
    if (!file_exists(self::file)) {
      self::createFile();
    }
    
    $xmlDoc = simplexml_load_file(self::file);
    $body = $xmlDoc->xpath('/opml/body')[0];
    error_log(print_r($body, true));
  
    $outline = $body->appendChild(
      $xmlDoc->createElement("outline")
    );
    
    $outline->appendChild(
      $xmlDoc->createAttribute("text"))->appendChild(
        $xmlDoc->createTextNode($name));
    
    $outline->appendChild(
      $xmlDoc->createAttribute("description"))->appendChild(
        $xmlDoc->createTextNode($description));

    $outline->appendChild(
      $xmlDoc->createAttribute("category"))->appendChild(
        $xmlDoc->createTextNode($category));
    
    $outline->appendChild(
      $xmlDoc->createAttribute("created"))->appendChild(
        $xmlDoc->createTextNode(gmdate("D, d M Y H:i:s \G\M\T")));
        
    // TODO: Update the dateModified attribute
    // $head->appendChild(
    //  $xmlDoc->createElement("dateModified", gmdate("D, d M Y H:i:s \G\M\T")));
        
    self:save($xmlDoc);
  }

  public function createFile() {
    //create the xml document
    $xmlDoc = new DOMDocument();

    //create the root element
    $root = $xmlDoc->appendChild(
      $xmlDoc->createElement("opml")
    );
    
    $root->appendChild(
      $xmlDoc->createAttribute("version"))->appendChild(
        $xmlDoc->createTextNode("2.0"));


    // head        
    $head = $root->appendChild(
      $xmlDoc->createElement("head")
    );

    $head->appendChild(
      $xmlDoc->createElement("Title", "OPDML"));
      
    $head->appendChild(
      $xmlDoc->createElement("dateCreated", gmdate("D, d M Y H:i:s \G\M\T")));
      
    $head->appendChild(
      $xmlDoc->createElement("dateModified", gmdate("D, d M Y H:i:s \G\M\T")));
      
    $head->appendChild(
      $xmlDoc->createElement("docs", "http://dev.opml.org/spec2.html"));

    // body
    $body = $root->appendChild(
      $xmlDoc->createElement("body")
    );
    
    self::save($xmlDoc);
  }
  
  function save($xmlDoc) {
   
    // save the file
    $xmlDoc->saveXML();
           
    //make the output pretty
    $xmlDoc->formatOutput = true;
    
    // Write the contents to the file
    file_put_contents(self::file, $xmlDoc->saveXML());	    
  }
}
?>
