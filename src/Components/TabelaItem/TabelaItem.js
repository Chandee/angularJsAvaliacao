import React, { Component } from 'react';

class TabelaItem extends Component{


  render(){
    return(
      <tr onClick={()=>{this.props.showModal(); this.props.selecionado(this.props.escolhido, this.props.posicao )}}>
        <th>{this.props.escolhido.id}</th>
        <th>{this.props.escolhido.Nome}</th>
        <th>{this.props.escolhido.Email}</th>
        <th>{this.props.escolhido.Estado}</th>
      </tr>
    )
  }

}

export default TabelaItem;
