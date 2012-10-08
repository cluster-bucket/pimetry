<?php
class Controllers_Item extends RestController {
  public function get() {
    // 'TestResponse' => 'I am GET response. Variables sent are - ' . http_build_query($this->request['params'])
    $opml = new OPML();
    $items = $opml->show();
	  $this->response = $items;
	  $this->responseStatus = 200;
  }
  public function post() {
	  $params = $this->request['params'];
	  if (empty($params['name'])) {
	    $this->responseStatus = 400;
	    $this->response = array('error' => '');     
	  } else {
      $opml = new OPML();
	    $opml->append($params);
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
