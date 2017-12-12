(function(window) {
  'use strict';
  const win = window;
  const perPage = 100;
  const uri = `https://prod--gateway.elifesciences.org/podcast-episodes?per-page=${perPage}`;

  function getData(uri) {
    return new Promise(
      function resolver(resolve, reject) {
        let xhr = new win.XMLHttpRequest();
        xhr.addEventListener('load', () => {
          resolve(xhr.responseText);
      });
        xhr.addEventListener('error', reject);
        xhr.open('GET', uri);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
      }
    );
  }

  function processData(data) {
    const jsonData = JSON.parse(data);
    return jsonData.items.map((item) => {
      return {
        episodeNumber: item.number,
        sourceUri: item.sources[0].uri
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

      const $uriCell = document.createElement('td');
      $uriCell.innerHTML = item.sourceUri;
      $tr.appendChild($uriCell);

      $table.appendChild($tr);
    });
  }

  function createTableSkeleton(document) {
    const $table = document.createElement('table');
    const $thead = document.createElement('thead');
    const headings = ['Episode number', 'Episdode URI on eLife site'];
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
