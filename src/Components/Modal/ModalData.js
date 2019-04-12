import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import MyButton from '../Buttons/MyButton';



class ModalData extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nome: this.props.dadoSelecionado && this.props.dadoSelecionado.Nome ? this.props.dadoSelecionado.Nome : '',
      email: this.props.dadoSelecionado && this.props.dadoSelecionado.Email ? this.props.dadoSelecionado.Email : '',
      estado: this.props.dadoSelecionado && this.props.dadoSelecionado.Estado ? this.props.dadoSelecionado.Estado : '',
    }
  }


  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose} >
        <Modal.Header>
          {this.props.titulo}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group >
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escreva seu nome"
                onChange={(e) => this.handleChange('nome', e.target.value)}
                value={this.state.nome} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="nome@exemplo.com"
                onChange={(e) => this.handleChange('email', e.target.value)}
                value={this.state.email} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escreva seu estado"
                onChange={(e) => this.handleChange('estado', e.target.value)}
                value={this.state.estado} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>

          {this.props.botoes.map(m => {
            if (m.excluValue) {
              let myexc = m.excluValue
              return (
                <Modal show={myexc} variant="warning">
                  <Alert variant="warning"> Você tem certeza que quer excluir?
                  <div style={{float: 'right',marginTop: '40px'}}>
                    <MyButton 
                      text={'Excluir'}
                      cor={'danger'}
                      funcao={()=>{m.excluir(this.props.posicao); myexc = false}}
                      />
                      <MyButton 
                      text={'Cancelar'}
                      funcao={()=>{m.funcao(); }}
                      />
 
                  </div>
                  </Alert>
                </Modal>
              )
            }
            return null
          })}


          {this.props.botoes.map(m => {
            return (
              <MyButton
                text={m.text}
                cor={m.cor}
                funcao={m.funcao}
                nome={this.state.nome}
                email={this.state.email}
                estado={this.state.estado}
                posicao={this.props.posicao}
              />
            )
          })}
        </Modal.Footer>

      </Modal>
    )
  }
}

export default ModalData