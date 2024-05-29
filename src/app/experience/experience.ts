export interface ExperienceData{
  id:number
  nome_empresa:string
  inicio:string
  fim:string | null
  cargo:string
}
export class Experience{
  id:number
  nome_empresa:string
  inicio:string
  fim:string | null
  cargo:string

  constructor(data:ExperienceData){
    this.id = data.id,
    this.nome_empresa = data.nome_empresa
    this.inicio = data.inicio
    this.fim = data.fim
    this.cargo = data.cargo
  }
}
