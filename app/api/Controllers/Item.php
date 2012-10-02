<?php
class Controllers_Item extends RestController {
	public function get() {
		$this->response = array('TestResponse' => 'I am GET response. Variables sent are - ' . http_build_query($this->request['params']));
		$this->responseStatus = 200;
	}
	public function post() {
		$this->response = array('TestResponse' => 'I am POST response. Variables sent are - ' . http_build_query($this->request['params']));
		$this->responseStatus = 201;

		$title = $this->request['params']['name'];
		$description = $this->request['params']['details'];
		$category = $this->request['params']['tags'];
		
		$opml = new OPML();
		$opml->append($title, $description, $category);
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
