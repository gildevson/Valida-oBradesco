import React, { useState } from "react";
import "./FileReaderComponent.css";  // Certifique-se de que esse arquivo contém o CSS atualizado

function FileReaderComponent() {
  const [fileContent, setFileContent] = useState("");
  const [error, setError] = useState(""); // Para exibir erros caso o tipo de arquivo seja inválido

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file && file.name.toLowerCase().endsWith(".rem" || ".ret")) {
      const reader = new FileReader();
      setError(""); // Limpa qualquer mensagem de erro anterior

      reader.onload = (event) => {
        setFileContent(event.target.result); // Armazena o conteúdo do arquivo no estado
      };

      reader.readAsText(file); // Lê o arquivo como texto
    } else {
      setError("Por favor, selecione um arquivo com extensão .rem.");
      setFileContent(""); // Limpa o conteúdo anterior se houver um erro
    }
  };

  const highlightText = () => {
    // Separa o conteúdo do arquivo em linhas
    const lines = fileContent.split("\n");

    // Aplica a estilização apenas a partir da segunda linha
    return lines.map((line, index) => {
      if (index === 0) {
        // Primeira linha, retorna sem formatação
        return <div key={index}>{line}</div>;
      } else if (line.length > 314) {
        // Se a linha for maior que 314 caracteres, tratamos as colunas de 121-126, 275-314, e 352-394

        const before121 = line.slice(0, 120); // Parte antes do destaque laranja
        const highlight121 = line.slice(120, 126); // Destaque laranja (vencimento do título)
        const after121 = line.slice(126, 274); // Parte após o destaque laranja e antes do verde

        const highlight275 = line.slice(274, 314); // Destaque verde (campo novo)
        const after275 = line.slice(314, 351); // Parte após o destaque verde e antes do azul

        const highlight352 = line.slice(351, 394); // Destaque azul (nome do sacado)
        const after352 = line.slice(394); // Parte após o destaque azul

        const highlight235 = line.slice(234,274)
        const after235 = line.slice(234,275)



        return (
          <div key={index}>
            {before121}
            <span className="highlight-orange">{highlight121}</span>
            {after121}
            <span className="highlight-green">{highlight275}</span>
            {after275}
            <span className="highlight">{highlight352}</span>
            {after352}
            <span className="highlight-purple">{highlight235}</span>
            {after235}
          </div>
        );
      } else if (line.length > 120) {
        // Se a linha só for maior que 120 caracteres (somente destaque laranja e verde)
        const before121 = line.slice(0, 120);
        const highlight121 = line.slice(120, 126);
        const after121 = line.slice(126, 274);

        if (line.length > 275) {
          const highlight275 = line.slice(274, 314);
          const after275 = line.slice(314);

          return (
            <div key={index}>
              {before121}
              <span className="highlight-orange">{highlight121}</span>
              {after121}
              <span className="highlight-green">{highlight275}</span>
              {after275}
            </div>
          );
        } else {
          return (
            <div key={index}>
              {before121}
              <span className="highlight-orange">{highlight121}</span>
              {after121}
            </div>
          );
        }
      } else {
        // Se a linha for menor que 120, retorna a linha como está
        return <div key={index}>{line}</div>;
      }
    });
  };

  return (
    <div className="container">
      <div className="header">Leitor de Arquivo .rem</div>
      <input
        type="file"
        accept=".rem"
        onChange={handleFileUpload}
        className="inputFile"
      />
      {error && <div className="error">{error}</div>}

      {/* Legenda adicionada aqui */}
      <div className="legend">
        <div>
          <span className="highlight-orange">Texto Laranja</span>: Campo de vencimento do título
        </div>
        <div>
          <span className="highlight-green">Texto Verde</span>: Endereço SACADO
        </div>
        <div>
          <span className="highlight">Texto Azul</span>: Nome do Cedente
        </div>
        <div>
          <span className="highlight-purple">Texto roxo</span>: Nome do Sacado 235-275
        </div>
      </div>

      <div>


      </div>

      <div className="fileContentContainer">
        <pre className="fileContent">{highlightText()}</pre>
      </div>
    </div>
  );
}

export default FileReaderComponent;
