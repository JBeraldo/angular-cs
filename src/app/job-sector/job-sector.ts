export interface JobSectorData{
    id:number
    nome:string
    descricao:string
}
export class JobSector{
    id:number
    nome:string
    descricao:string

    constructor(data: JobSectorData){
        this.id = data.id
        this.nome = data.nome
        this.descricao = data.descricao
    }
}
