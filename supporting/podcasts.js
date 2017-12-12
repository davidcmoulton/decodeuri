(function(window) {
  'use strict';
  const win = window;
  const perPage = 100;
  const uri = `https://prod--gateway.elifesciences.org/podcast-episodes?per-page=${perPage}`;

  function getData(uri, headOnly) {
    const method = headOnly ? 'HEAD' : 'GET';
    return new Promise(
      function resolver(resolve, reject) {
        let xhr = new win.XMLHttpRequest();
        xhr.addEventListener('load', () => {
          if (method === 'GET') {
            resolve(xhr.responseText);
          } else if (method === 'HEAD') {
            resolve(xhr.getAllResponseHeaders());
          } else {
            throw new Error(`Unexpected xhr method "${method}" attempted (HEAD and GET are allowed)`);
          }
      });
        xhr.addEventListener('error', reject);
        xhr.open(method, uri);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
      }
    );
  }

  function processData(data) {
    const jsonData = JSON.parse(data);
    return jsonData.items.map((item) => {
      const uri = item.sources[0].uri;
      return {
        episodeNumber: item.number,
        sourceUri: uri
      };
    });
  }

  function handleError(error) {
    console.error(error);
  }

  function report(data) {
    console.log('data: ', data);
    buildView(data);
  }

  function buildView(data) {
    const doc = win.document;
    const $table = createTableSkeleton(doc);
    populateTable(data, $table, doc);
    doc.querySelector('body').appendChild($table);
  }

  function populateTable(data, $table, document) {
    data.forEach((item) => {
      const $tr = document.createElement('tr');

      const $numberCell = document.createElement('td');
      $numberCell.innerHTML = item.episodeNumber;
      $tr.appendChild($numberCell);

      const $uri = item.sourceUri;
      const $uriCell = document.createElement('td');
      const $a = document.createElement('a');
      $a.setAttribute('href', $uri);
      $a.innerHTML = $uri;
      $uriCell.appendChild($a);
      $tr.appendChild($uriCell);

      $table.appendChild($tr);
    });
  }

  function createTableSkeleton(document) {
    const $table = document.createElement('table');
    const $thead = document.createElement('thead');
    const headings = ['Episode number', 'URI which eLife site is requesting from naked scientists'];
    for(let i = 0; i < headings.length; i += 1) {
      const $heading = document.createElement('th');
      $heading.innerHTML = headings[i];
      $thead.appendChild($heading);
    }
    const $tbody = document.createElement('tbody');
    $table.appendChild($thead);
    $table.appendChild($tbody);
    return $table;
  }

  getData(uri)
    .then(processData, handleError)
    .then(report);

}(window));
