import React, { useState } from "react";
import "./FileReaderComponent.css"; // Arquivo CSS para estilizar o componente

function FileReaderComponent() {
  const [fileContent, setFileContent] = useState(""); // Estado para armazenar o conteúdo do arquivo
  const [error, setError] = useState(""); // Estado para armazenar mensagens de erro

  // Função chamada quando um arquivo é selecionado
  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Obtém o primeiro arquivo selecionado

    // Verifica se o arquivo possui as extensões permitidas (.rem ou .ret)
    if (file && (file.name.toLowerCase().endsWith(".rem") || file.name.toLowerCase().endsWith(".ret"))) {
      const reader = new FileReader(); // Cria uma instância do FileReader
      setError(""); // Limpa mensagens de erro anteriores

      // Evento disparado quando a leitura do arquivo é concluída
      reader.onload = (event) => {
        setFileContent(event.target.result); // Armazena o conteúdo do arquivo no estado
      };

      reader.readAsText(file); // Lê o arquivo como texto
    } else {
      // Define uma mensagem de erro se o tipo do arquivo for inválido
      setError("Por favor, selecione um arquivo com extensão .rem ou .ret.");
      setFileContent(""); // Limpa o conteúdo anterior
    }
  };

  // Função para processar o texto e aplicar destaques
  const highlightText = () => {
    const lines = fileContent.split("\n");
  
    return lines.map((line, index) => {
      // A primeira linha é exibida sem destaque
      if (index === 0) {
        return <div key={index}>{line}</div>;
      }
  
      if (line.length > 394) {
        const initialPart = line.slice(0, 37);
        const highlight37 = line.slice(37, 43);
        const before110 = line.slice(43, 110);
        const highlight110 = line.slice(110, 120); // Correto: pega da posição 110 até 120 inclusive
        const after121 = line.slice(120, 234);
        const highlight234 = line.slice(234, 274);
        const highlight275 = line.slice(274, 314);
        const after275 = line.slice(314, 351);
        const highlight351 = line.slice(351, 394);
        const after351 = line.slice(394);
  
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
            {after351}
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
      {/* Cabeçalho */}
      <div className="header">Leitor de Arquivo .rem</div>

      {/* Input para upload de arquivo */}
      <input
        type="file"
        accept=".rem, .ret" // Aceita apenas arquivos com extensões .rem e .ret
        onChange={handleFileUpload} // Liga o evento de mudança à função de upload
        className="inputFile"
      />

      {/* Exibição de mensagens de erro */}
      {error && <div className="error">{error}</div>}

      {/* Legenda explicando os destaques */}
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


      </div>

      {/* Conteúdo do arquivo exibido com destaques */}
      <div className="fileContentContainer">
        <pre className="fileContent">{highlightText()}</pre>
      </div>
    </div>
  );
}

export default FileReaderComponent;
