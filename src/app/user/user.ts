import { Experience, ExperienceData } from "../experience/experience"
import { Skill, SkillData } from "../skill/skill"

export interface UserData{
  nome: string
  email: string
  ramo:string
  tipo:"candidato"|"empresa"|"usuario"
  descricao:string
  competencias: Array<SkillData>
  experiencia: Array<ExperienceData>
  senha:string
}
export class User {
  nome: string
  email: string
  ramo:string
  tipo:"candidato"|"empresa"|"usuario"
  descricao:string
  competencias: Array<Skill>
  experiencia: Array<Experience>
  senha:string | null

  constructor(data:UserData){
    this.nome = data?.nome || ''
    this.email =data?.email || ''
    this.ramo = data?.ramo|| ''
    this.descricao = data?.descricao || ''
    this.tipo = data?.tipo || 'usuario'
    this.competencias = data?.competencias || []
    this.experiencia = data?.experiencia || []
    this.senha = null
  }
}
