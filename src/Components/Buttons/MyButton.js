import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import './Button.scss'

class MyButton extends Component {

  render() {
    return (
      <Button variant={this.props.cor ? this.props.cor : 'primary'}
        onClick={() => {
          this.props.funcao({
            nome: this.props.nome,
            email: this.props.email,
            estado: this.props.estado,
            posicao: this.props.posicao
          });
        }}
        className="BotaoDefault">
        {this.props.text}
      </Button>
    )
  }
}

export default MyButton