export interface SkillData{
  id:number
  nome:string
}
export class Skill {
  id:number
  nome:string

  constructor(data:SkillData){
    this.id = data.id
    this.nome = data.nome
  }
}
