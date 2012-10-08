<?php
class OPML {
  // Set the file
  const FILE_PATH = 'Data/pymetry.opml';

  function parse_items($arr, $items=array()) {
    
    foreach($arr as $item) {
      $attrs = array();
      $attr = $item['@attributes'];
      foreach($attr as $key => $value) {
        $attrs[$key] = $value;      
      }
      
      if (isset($item['outline'])) {
        $attrs['children'] = $this->parse_items($item['outline']);
      } else {
        $attrs['children'] = array();
      }
      
      array_push($items, $attrs);
    }
    return $items;  
  }
  
  // Convert XML to associative array
  function to_array($xml) {
    $json = json_encode($xml);
    $xml_arr = json_decode($json, true);
    $items = $this->parse_items($xml_arr['outline']);
    return $items;
  }
  
  public function show() {
    if (!file_exists(self::FILE_PATH)) {
      self::createFile();
    }
    
    $xmlDoc = simplexml_load_file(self::FILE_PATH);
    $body = $xmlDoc->xpath('/opml/body');
    $items = $this->to_array($body[0]);
    return $items;
  }

  public function append($attributes) {
  
    if (!file_exists(self::FILE_PATH)) {
      self::createFile();
    }
    
    // Extract the attributes into variables
    extract($attributes, EXTR_PREFIX_ALL, "attr");
    
    $xmlDoc = simplexml_load_file(self::FILE_PATH);

    // Add the new item
    if (isset($attr_parent) && !empty($attr_parent)) {
      $body = $xmlDoc->xpath('//outline[@id="'.$attr_parent.'"]');
    } else {
      $body = $xmlDoc->xpath('/opml/body');
    }
    
    // TODO: Return an error if no items are found
    $item = $body[0]->addChild('outline');

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
    $item->addAttribute('id', time());
        
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
    file_put_contents(self::FILE_PATH, $dom->saveXML());	    
  }
}
?>
