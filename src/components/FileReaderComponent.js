import React, { useState } from "react";
import "./FileReaderComponent.css"; // Arquivo CSS para estilizar o componente

function FileReaderComponent() {
  const [fileContent, setFileContent] = useState("");
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file && (file.name.toLowerCase().endsWith(".rem") || file.name.toLowerCase().endsWith(".ret"))) {
      const reader = new FileReader();
      setError("");

      reader.onload = (event) => {
        setFileContent(event.target.result);
      };

      reader.readAsText(file);
    } else {
      setError("Por favor, selecione um arquivo com extensão .rem ou .ret.");
      setFileContent("");
    }
  };

  const highlightText = () => {
    const lines = fileContent
      .split("\n")
      .filter((line) => line.trim() !== ""); // remove linhas em branco

    return lines.map((line, index) => {
      // Garante que a linha de header não seja destacada
      if (line.startsWith("01REMESSA")) {
        const paddedLine = line.padEnd(400, " "); // garante 400 caracteres
        const mainPart = paddedLine.slice(0, 394);
        const highlight394 = paddedLine.slice(394, 400);
        const after400 = paddedLine.slice(400);


        return (
          <div key={index}>
            <span className="fileLine">{mainPart}</span>
            <span className="highlight-yellow">{highlight394}</span>
            {after400}
          </div>
        );
      }

      if (line.length > 394) {
        const initialPart = line.slice(0, 37);
        const highlight37 = line.slice(37, 43);
        const beforeNn83 = line.slice(72, 83);
        const after110 = line.slice(83, 110);
        const highlight110 = line.slice(110, 120); // Número do documento
        const highlightVencimento = line.slice(120, 126); // Vencimento do título
        const afterVencimento = line.slice(126, 234);
        const highlight234 = line.slice(234, 274); // Nome do Sacado
        const highlight275 = line.slice(274, 314); // Endereço
        const after275 = line.slice(314, 351);
        const highlight351 = line.slice(351, 394); // Nome do Cedente
        const highlight394 = line.slice(394, 400);
        const after400 = line.slice(400);

        return (
          <div key={index}>
            {initialPart}
            <span className="highlight-grey">{highlight37}</span>
            {line.slice(43, 72)}
            <span className="highlight-red">{beforeNn83}</span>
            {after110}
            <span className="highlight-pink">{highlight110}</span>
            <span className="highlight-orange">{highlightVencimento}</span>
            {afterVencimento}
            <span className="highlight-purple">{highlight234}</span>
            <span className="highlight-green">{highlight275}</span>
            {after275}
            <span className="highlight-blue">{highlight351}</span>
            <span className="highlight-yellow">{highlight394}</span>
            {after400}
          </div>
        );
      } else if (line.length > 43) {
        const initialPart = line.slice(0, 37);
        const highlight37 = line.slice(37, 43);
        const after43 = line.slice(43);

        return (
          <div key={index}>
            {initialPart}
            <span className="highlight-grey">{highlight37}</span>
            {after43}
          </div>
        );
      } else {
        return <div key={index}>{line}</div>;
      }
    });
  };

  return (
    <div className="container">
      <div className="header">Leitor de Arquivo .rem</div>

      <input
        type="file"
        accept=".rem, .ret"
        onChange={handleFileUpload}
        className="inputFile"
      />

      {error && <div className="error">{error}</div>}

      <div className="legend">
        <table className="legend-table">
          <thead>
            <tr>
              <th>Cor</th>
              <th>Descrição</th>
              <th>Posição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="highlight-grey">Cinza</span></td>
              <td>Doc_id</td>
              <td>37–43</td>
            </tr>
            <tr>
              <td><span className="highlight-orange">Laranja</span></td>
              <td>Vencimento do Título</td>
              <td>120–126</td>
            </tr>
            <tr>
              <td><span className="highlight-purple">Roxo</span></td>
              <td>Nome do Sacado</td>
              <td>234–274</td>
            </tr>
            <tr>
              <td><span className="highlight-green">Verde</span></td>
              <td>Endereço do Sacado</td>
              <td>274–314</td>
            </tr>
            <tr>
              <td><span className="highlight-blue">Azul</span></td>
              <td>Nome do Cedente</td>
              <td>351–394</td>
            </tr>
            <tr>
              <td><span className="highlight-pink">Rosa</span></td>
              <td>Número do Documento</td>
              <td>110–120</td>
            </tr>
            <tr>
              <td><span className="highlight-yellow">Amarelo</span></td>
              <td>Identificador de Linha</td>
              <td>394–399</td>
            </tr>
            <tr>
              <td><span className="highlight-red">Vermelho</span></td>
              <td>Identificador de NN</td>
              <td>72–83</td>
            </tr>
          </tbody>
        </table>
      </div>


      <div className="fileContentContainer">
        <pre className="fileContent">{highlightText()}</pre>
      </div>
    </div>
  );
}

export default FileReaderComponent;
