import React, { Component } from 'react';

class HeadTable extends Component {


    constructor(props) {
        super(props)
        this.state = {
            id: false,
            Nome: false,
            Email: false,
            Estado: false,
            escreve: '',
            escreve2: '',
            escreve3: '',
            myNewVet: [],
        }
    }

    setSort = (name) => {
        let mydata = [...this.props.dadosEdit]
        let sorted = mydata.sort((a, b) => a[name].toString().toLowerCase().localeCompare(b[name].toString(), 'br', { ignorePunctuation: true, numeric: true }))
        this.props.retorno(sorted)
        this.setState({
            [name]: true
        })
    }



    setReverse = (name) => {
        let mydata = [...this.props.dadosEdit]
        let reverse = mydata.sort((a, b) => a[name].toString().toLowerCase().localeCompare(b[name].toString(), 'br', { ignorePunctuation: true, numeric: true }))
        let reverse2 = reverse.reverse((a, b) => a[name].toString().toLowerCase().localeCompare(b[name].toString(), 'br', { ignorePunctuation: true, numeric: true }))
        this.props.retorno(reverse2)
        this.setState({
            [name]: false
        })
    }


    filterItems = (query, name) => {
        let filtrado
        let mydado = this.props.dados
        let resultado = mydado.filter((el)=> {
            console.log("elpoha", el)
            console.log("whata a qury", query)
            if(el[name]){
                filtrado = el[name].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(query.toLowerCase()) > -1;
                console.log("o filrto",filtrado)
                return filtrado ;

            }
            return false
        })
        console.log("whata a resultado", resultado  )
        this.props.attFiltro(resultado)
    }

    finalTeste = (fim) =>{
        console.log("o que eu to mandando", fim)
       // this.props.attFiltro(fim.resultado, fim.query)
      
    }



    render() {
        console.log("THISTATE", this.state.Nome)
        //console.log("opaaa",this.filterItems(this.state.escreve, 'Nome'));

        return (
            <thead>
                <tr>
                    <th onClick={() => this.state.id ? this.setReverse('id') : this.setSort('id')}>Id</th>
                    <th onClick={() => this.state.Nome ? this.setReverse('Nome') : this.setSort('Nome')}>Nome</th>
                    <th onClick={() => this.state.Email ? this.setReverse('Email') : this.setSort('Email')}>Email</th>
                    <th onClick={() => this.state.Estado ? this.setReverse('Estado') : this.setSort('Estado')}>Estado</th>
                </tr>
                <tr>
                    <th></th>
                    <th><input onChange={(e) => {this.setState({ escreve: e.target.value },()=>this.filterItems(this.state.escreve, 'Nome'))}}></input></th>
                    <th><input onChange={(e) => {this.setState({ escreve2: e.target.value },()=>this.filterItems(this.state.escreve2, 'Email'))}}></input></th>
                    <th><input onChange={(e) => {;this.setState({ escreve3: e.target.value },this.filterItems(this.state.escreve3, 'Estado'))}}></input></th>

                </tr>
            </thead>
        )
    }
}

export default HeadTable;