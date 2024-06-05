export interface JobSectorData{
    id:number
    nome:string
    descrição:string
}
export class JobSector{
    id:number
    nome:string
    descrição:string

    constructor(data: JobSectorData){
        this.id = data.id
        this.nome = data.nome
        this.descrição = data.descrição
    }
}