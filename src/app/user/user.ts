export interface UserData{
  nome: string
  email: string
  ramo:string
  tipo:"candidato"|"empresa"|"usuario"
  descricao:string
}
export class User {
  nome: string
  email: string
  ramo:string
  tipo:"candidato"|"empresa"|"usuario"
  descricao:string

  constructor(data:UserData){
    this.nome = data?.nome || ''
    this.email =data?.email || ''
    this.ramo = data?.ramo|| ''
    this.descricao = data?.descricao || ''
    this.tipo = data?.tipo || 'usuario'
  }

}
