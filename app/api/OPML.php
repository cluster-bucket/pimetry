<?php
class OPML {
  // Set the file
  const file = 'Data/pymetry.opml';

  public function append($attributes) {
  
    if (!file_exists(self::file)) {
      self::createFile();
    }
    
    // Extract the attributes into variables
    extract($attributes, EXTR_PREFIX_ALL, "attr");
    
    $xmlDoc = simplexml_load_file(self::file);
    $body = $xmlDoc->xpath('/opml/body');

    // Add the new item
    $item = $body[0]->addChild('outline');

    error_log("Name: $attr_name");    
    if (isset($attr_name)) {
      $item->addAttribute('text', $attr_name);
    }
    
    if (isset($attr_details)) {
      $item->addAttribute('description', $attr_details);
    }
    
    if (isset($attr_tags)) {
      $item->addAttribute('category', $attr_tags);
    }
    
    if (isset($attr_type)) {
      $item->addAttribute('type', $attr_type);
    }
    
    if (isset($attr_url)) {
      $item->addAttribute('url', $attr_url);
    }
    
    $item->addAttribute('created', gmdate("D, d M Y H:i:s \G\M\T"));
        
    self::save($xmlDoc);
  }

  public function createFile() {
    $created = gmdate("D, d M Y H:i:s \G\M\T");
    
$xmlStr = <<<XML
<?xml version='1.0'?>
<opml version='2.0'>
  <head>
    <Title>OPDML</Title>
    <dateCreated>$created</dateCreated>
    <dateModified>$created</dateModified>
    <docs>http://dev.opml.org/spec2.html</docs>
  </head>
  <body>
  </body>
</opml>
XML;

    $xmlDoc = new SimpleXMLElement($xmlStr);
    self::save($xmlDoc);
  }
  
  function save($xmlDoc) {
   
    // Update the dateModified element
    $head = $xmlDoc->xpath('/opml/head');
    $head[0]->dateModified = gmdate("D, d M Y H:i:s \G\M\T");
    
    // Make it pretty
    $dom = new DOMDocument('1.0');
    $dom->preserveWhiteSpace = false;
    $dom->formatOutput = true;
    $dom->loadXML($xmlDoc->asXML());
    
    // Write the contents to the file
    file_put_contents(self::file, $dom->saveXML());	    
  }
}
?>
