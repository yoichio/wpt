// META: global=window,worker
// META: script=../resources/utils.js
// META: script=/common/utils.js
// META: script=/common/get-host-info.sub.js

function testUpload(desc, url, method, createBody, expectedBody) {
  const requestInit = {method};
  promise_test(async function(){
    const body = createBody();
    if (body) {
      requestInit["body"] = body;
    }
    const resp = await fetch(url, requestInit);
    const text = await resp.text();
    assert_equals(text, expectedBody);
  }, desc);
}

const url = RESOURCES_DIR + "echo-content.h2.py"

testUpload("Fetch with POST with empty ReadableStream", url,
  "POST",
  () => {
    return new ReadableStream({start: controller => {
      controller.close();
    }})
  },
  "");

testUpload("Fetch with POST with ReadableStream", url,
  "POST",
  () => {
    return new ReadableStream({start: controller => {
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode("Test"));
      controller.close();
    }})
  },
  "Test");

function testUploadFailure(desc, url, method, createBody) {
  const requestInit = {method};
  promise_test(t => {
    const body = createBody();
    if (body) {
      requestInit["body"] = body;
    }
    return promise_rejects_js(t, TypeError, fetch(url, requestInit));
  }, desc);
}

testUploadFailure("Fetch with POST with ReadableStream containing String", url,
  "POST",
  () => {
    return new ReadableStream({start: controller => {
      controller.enqueue("Test");
      controller.close();
    }})
  });
