(function(window) {
  'use strict';
  const win = window;
  const perPage = 100;
  const uri = `https://api.elifesciences.org/podcast-episodes?per-page=${perPage}`;

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
    buildView(data);
  }

  function buildView(data) {
    const doc = win.document;
    const $body = doc.querySelector('body');

    const $h1 = doc.createElement('h1');
    $h1.innerHTML = 'eLife podcast episode URIs';
    $body.appendChild($h1);

    const $p = doc.createElement('p');
    $p.innerHTML = 'This page lists each eLife podcast, with a link to the page on the eLife site,';
    $p.innerHTML += ' and a link to the episode audio file which the eLife page uses from a';
    $p.innerHTML += ' naked scientists domain. It can be used to validate the links, and so to ';
    $p.innerHTML += ' quickly identity any that are broken and so need updating.';
    $body.appendChild($p);

    const $table = createTableSkeleton(doc);
    populateTable(data, $table, doc);
    $body.appendChild($table);
  }

  function populateTable(data, $table, document) {
    data.forEach((item) => {
      const $tr = document.createElement('tr');

      const episodeNumber = item.episodeNumber;
      const $numberCell = document.createElement('td');
      const $aNumber = document.createElement('a');
      $aNumber.setAttribute('href', `https://elifesciences.org/podcast/episode${episodeNumber}`);
      $aNumber.setAttribute('target', 'external');
      $aNumber.innerHTML = episodeNumber;
      $numberCell.appendChild($aNumber);
      $tr.appendChild($numberCell);

      const $uri = item.sourceUri;
      const $uriCell = document.createElement('td');
      const $aUri = document.createElement('a');
      $aUri.setAttribute('href', $uri);
      $aUri.innerHTML = $uri;
      $uriCell.appendChild($aUri);
      $tr.appendChild($uriCell);

      $table.appendChild($tr);
    });
  }

  function createTableSkeleton(document) {
    const $table = document.createElement('table');
    const $thead = document.createElement('thead');
    const headings = ['Episode number (linked to eLife page)', 'URI which eLife site is requesting from naked scientists\' site'];
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
