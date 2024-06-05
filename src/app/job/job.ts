import { JobSector, JobSectorData } from "../job-sector/job-sector"
import { SkillData } from "../skill/skill"

export interface JobData{
  id:number
  ramo_id:string
  titulo:string
  descrição:string
  competencias:Array<SkillData>
  experiencia:number
  salario_min:number
  salario_max:number
  ativo:boolean
  ramo:JobSectorData
}
export class Job {
  id:number
  ramo_id:string
  titulo:string
  descrição:string
  competencias:Array<SkillData>
  experiencia:number
  salario_min:number
  salario_max:number
  ativo:boolean
  ramo:JobSector
  constructor(data:JobData){
    this.id = data.id
    this.ramo_id = data.ramo_id
    this.titulo = data.titulo
    this.descrição = data.descrição
    this.competencias = data.competencias
    this.experiencia = data.experiencia
    this.salario_min = data.salario_min
    this.salario_max = data.salario_max
    this.ativo = data.ativo
    this.ramo = data.ramo
  }
}
