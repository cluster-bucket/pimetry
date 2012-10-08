<?php
class Controllers_Item extends RestController {
  function __construct() {
    $this->opml = new OPML();
  }
  public function get() {
    // 'TestResponse' => 'I am GET response. Variables sent are - ' . http_build_query($this->request['params'])
    $items = $this->opml->show();
	  $this->response = array($items);
	  $this->responseStatus = 200;
  }
  public function post() {
	  $params = $this->request['params'];
	  if (empty($params['name'])) {
	    $this->responseStatus = 400;
	    $this->response = array('error' => '');     
	  } else {
	    $this->opml->append($params);
	    $this->response = array('TestResponse' => 'I am POST response. Variables sent are - ' . http_build_query($this->request['params']));
	    $this->responseStatus = 201;
	  }	
  }
  public function put() {
	  $this->response = array('TestResponse' => 'I am PUT response. Variables sent are - ' . http_build_query($this->request['params']));
	  $this->responseStatus = 200;
  }
  public function delete() {
	  $this->response = array('TestResponse' => 'I am DELETE response. Variables sent are - ' . http_build_query($this->request['params']));
	  $this->responseStatus = 200;
  }
}
