import React, { useState } from "react";
import "./FileReaderComponent.css"; // Certifique-se de que esse arquivo contém o CSS atualizado

function FileReaderComponent() {
  const [fileContent, setFileContent] = useState("");
  const [error, setError] = useState(""); // Para exibir erros caso o tipo de arquivo seja inválido

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file && (file.name.toLowerCase().endsWith(".rem") || file.name.toLowerCase().endsWith(".ret"))) {
      const reader = new FileReader();
      setError(""); // Limpa qualquer mensagem de erro anterior

      reader.onload = (event) => {
        setFileContent(event.target.result); // Armazena o conteúdo do arquivo no estado
      };

      reader.readAsText(file); // Lê o arquivo como texto
    } else {
      setError("Por favor, selecione um arquivo com extensão .rem ou .ret.");
      setFileContent(""); // Limpa o conteúdo anterior se houver um erro
    }
  };

  const highlightText = () => {
    const lines = fileContent.split("\n");

    return lines.map((line, index) => {
      if (index === 0) {
        // Primeira linha retorna sem formatação
        return <div key={index}>{line}</div>;
      } else if (line.length > 394) {
        // Tratamento das colunas de 121-126, 234-274, 275-314, e 351-394
        // Excluindo o trecho inicial de qualquer destaque.

        const initialPart = line.slice(0, 120); // Parte inicial sem formatação
        const highlight121 = line.slice(120, 126); // Destaque laranja (vencimento do título)
        const after121 = line.slice(126, 234); // Parte após o destaque laranja e antes do roxo

        const highlight234 = line.slice(234, 274); // Destaque roxo (Nome do Sacado)
        const after234 = line.slice(274, 314); // Parte após o destaque roxo e antes do verde

        const highlight275 = line.slice(274, 314); // Destaque verde (campo novo)
        const after275 = line.slice(314, 351); // Parte após o destaque verde e antes do azul

        const highlight351 = line.slice(351, 394); // Destaque azul (nome do cedente)
        const after351 = line.slice(394); // Parte após o destaque azul

        return (
          <div key={index}>
            {initialPart} {/* Exibe o trecho inicial sem formatação */}
            <span className="highlight-orange">{highlight121}</span>
            {after121}
            <span className="highlight-purple">{highlight234}</span>
            {after234}
            <span className="highlight-green">{highlight275}</span>
            {after275}
            <span className="highlight-blue">{highlight351}</span>
            {after351}
          </div>
        );
      } else if (line.length > 120) {
        // Se a linha só for maior que 120 caracteres (somente destaque laranja, roxo e verde)
        const initialPart = line.slice(0, 120);
        const highlight121 = line.slice(120, 126);
        const after121 = line.slice(126, 234);

        const highlight234 = line.length >= 274 ? line.slice(234, 274) : "";
        const after234 = line.length > 274 ? line.slice(274) : "";

        return (
          <div key={index}>
            {initialPart} {/* Exibe o trecho inicial sem formatação */}
            <span className="highlight-orange">{highlight121}</span>
            {after121}
            {highlight234 && <span className="highlight-purple">{highlight234}</span>}
            {after234}
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

      {/* Legenda ajustada */}
      <div className="legend">
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
      </div>

      <div className="fileContentContainer">
        <pre className="fileContent">{highlightText()}</pre>
      </div>
    </div>
  );
}

export default FileReaderComponent;
