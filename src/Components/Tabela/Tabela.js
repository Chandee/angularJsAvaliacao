import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import ModalData from '../Modal/ModalData';
import TabelaItem from '../TabelaItem/TabelaItem';
import MyButton from '../Buttons/MyButton';
import HeadTable from '../Tabela/HeadTable';
import './Tabela.scss';


var dados = require('../../data.json')


class Tabela extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dados: [],
      show: false,
      mydata: '',
      showNew: false,
      excluir: false,
      idNew: '',
      filtrado: [],
      fsp: false,
      mystring: '',
    }
  }

  

  componentDidMount() {
    this.setState({
      dados: dados,
      idNew: dados.length + 1,
      filtrado: dados,
    })
  }

  handleClose = () => {
    this.setState({
      show: false,
    })
  }

  selecionado = (mydata, i) => {
    this.setState({
      selecionado: mydata,
      i: i,
    })
  }
  showModal = () => {
    this.setState({
      show: true
    })
  }

  showModalNew = () => {
    this.setState({
      showNew: true
    })
  }

  handleCloseNew = () => {
    this.setState({
      showNew: false,
    })
  }

  salvar = (param) => {
    let tempData = [...this.state.dados]
    tempData[param.posicao].Nome = param.nome;
    tempData[param.posicao].Email = param.email;
    tempData[param.posicao].Estado = param.estado;
    this.setState({
      dados: tempData,
      filtrado: tempData,
      show: false,
    })
  }

  salvarNovo = (param) => {
    let tempData = [...this.state.dados]
    tempData.push({
      Nome: param.nome,
      Email: param.email,
      Estado: param.estado,
      id: this.state.idNew
    })
    this.setState({
      dados: tempData,
      showNew: false,
      filtrado: tempData,
      idNew: this.state.idNew + 1,
    })
  }

  changeExcluir = () =>{
    this.setState({
      excluir: !this.state.excluir
    })
  }

  excluir = (param) =>{
    let tempData = [...this.state.dados]
    console.log("QUAL É A VERADERIRA", param)
    tempData.splice(param, 1)
    this.setState({
      dados: tempData,
      filtrado: tempData,
      show: false,
      excluir: false,
    })   

  }

  retorno = (param) =>{
    console.log("MYPARAM", param)
    this.setState({
      filtrado: param
    })
  }

  attFiltro = (param) =>{
    console.log("PARAMETRO",param)
    this.setState({
      filtrado: param,
    })
  }


  testeFinal = async ()=>{
    let dadosAtt = await this.state.filtrado
    return dadosAtt
  }
  render() {
   
    return (
      <div className="Espacamento">
        <MyButton
          text='Novo usuário'
          funcao={this.showModalNew}
        />
        <Table striped bordered hover>
          <HeadTable
            dados={this.state.dados}
            dadosEdit={this.state.filtrado}
            retorno={this.retorno}
            attFiltro={this.attFiltro}
          />
          <tbody>
            {this.state.filtrado.map((d, i) => {
              console.log("mypos", i)
              return (
                <TabelaItem
                  selecionado={this.selecionado}
                  showModal={this.showModal}
                  escolhido={d}
                  posicao={i}
                />
              )
            })}
          </tbody>
        </Table>

        {this.state.show && <ModalData
          handleClose={this.handleClose}
          show={this.state.show}
          botoes={[{ text: 'Cancelar', cor: 'secondary', funcao: this.handleClose },
          {text: 'Excluir', funcao: this.changeExcluir, excluir: this.excluir, excluValue: this.state.excluir },
          { text: 'Salvar', funcao: this.salvar }]}
          dadoSelecionado={this.state.selecionado}
          posicao={this.state.i}
          titulo='Editar Cadastro'
        />}

        {this.state.showNew && <ModalData
          handleClose={this.handleCloseNew}
          show={this.state.showNew}
          botoes={[{ text: 'Cancelar', cor: 'secondary', funcao: this.handleCloseNew },
          { text: 'Salvar', funcao: this.salvarNovo }]}
          posicao={this.state.i}
          titulo='Criar Cadastro'
        />}
      </div>
    )
    
  }
}

export default Tabela;