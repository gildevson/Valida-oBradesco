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
        const mainPart = line.slice(1, 394);
        const highlight394 = line.slice(394, 400);
        const after400 = line.slice(400);
      
        return (
          <div key={index}>
            {mainPart}
            <span className="highlight-yellow">{highlight394}</span>
            {after400}
          </div>
        );
      }

      if (line.length > 394) {
        const initialPart = line.slice(0, 37);
        const highlight37 = line.slice(37, 43);
        const before110 = line.slice(43, 110);
        const highlight110 = line.slice(110, 120); // 110 até 120
        const after121 = line.slice(120, 234);
        const highlight234 = line.slice(234, 274);
        const highlight275 = line.slice(274, 314);
        const after275 = line.slice(314, 351);
        const highlight351 = line.slice(351, 394);
        const highlight394 = line.slice(394, 400);
        const after400 = line.slice(400);

        return (
          <div key={index}>
            {initialPart}
            <span className="highlight-grey">{highlight37}</span>
            {before110}
            <span className="highlight-pink">{highlight110}</span>
            {after121}
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
        <div>
          <span className="highlight-grey">Texto Cinza</span>: Doc_id do (37-43)
        </div>
        <div>
          <span className="highlight-orange">Texto Laranja</span>: Campo de vencimento do título
        </div>
        <div>
          <span className="highlight-purple">Texto Roxo</span>: Nome do Sacado (234-274)
        </div>
        <div>
          <span className="highlight-green">Texto Verde</span>: Endereço SACADO
        </div>
        <div>
          <span className="highlight-blue">Texto Azul</span>: Nome do Cedente (351-394)
        </div>
        <div>
          <span className="highlight-pink">Texto Rosa</span>: Número do Documento (110-120)
        </div>
        <div>
          <span className="highlight-yellow">Texto Amarelo</span>: Identificador de linha (394–399)
        </div>
      </div>

      <div className="fileContentContainer">
        <pre className="fileContent">{highlightText()}</pre>
      </div>
    </div>
  );
}

export default FileReaderComponent;
