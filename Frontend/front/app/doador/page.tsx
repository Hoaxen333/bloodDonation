'use client'
import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useState,useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { SquarePen,Trash,Check,Ban, SquarePlus, Icon} from 'lucide-react';
import React from 'react'
import { Input } from '@/components/ui/input'
import AddDoador from '@/components/AddDoador'
import EditDoador from '@/components/EditDoador'
import { toast } from '@/hooks/use-toast'

const page = () => {
    interface Doador{
        id: any,
        nome: string,
        bi: string,
        nacionalidade:string
        dataNascimento: string,
        tipoSanguineo: string,
        disponibilidade: boolean
        peso: number
    }
    // UseState
    const [doadores,setDoadores] = useState<Doador[]>([]);
    const [tipoSang,setTipoSang] = useState<string>('');
   

    //UseEffect
    useEffect(()=>{
        fetch("http://localhost:8080/api/doador")
        .then(doadores=>doadores.json())
        .then(c_doadores=>setDoadores(c_doadores));
    },[]);

    
    
    const handleTipoSangChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setTipoSang(e.target.value);
    }
    //Delete
    const handleDelete = (id: number) => {
        fetch(`http://localhost:8080/api/doador/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
          .then((retorno) => {
            if (!retorno.ok) {
              throw new Error(`Erro ao excluir: ${retorno.statusText}`);
            }
            // Verifica se a resposta tem conteúdo antes de chamar .json()
            return retorno.text().then(text => text ? JSON.parse(text) : {});
          })
          .then((retorno_convertido) => {
            if (retorno_convertido.mensagem !== undefined) {
              // Exibir mensagem de erro ou feedback ao usuário
              console.log(retorno_convertido.mensagem);
            } else {
                toast({
                    title: "Sucesso!",
                    description: "Registo Removido com sucesso!",
                });
                
              const novoVetorDoadores = doadores.filter((d) => d.id !== id);
              setDoadores(novoVetorDoadores);
            }
          })
          .catch((error) => {
            toast({
                variant: "destructive",
                title: "Erro!",
                description: "Falha ao remover registo!",
            });
          });
      };
      
      
  return (
    
    <div>
        <SidebarProvider >
            <AppSidebar/>
            <main className='flex gap-1 p-2'>
                <SidebarTrigger />
                <div className='p-4 grid grid-cols-1'>
                    <div className='flex items-center gap-2'>
                        <h2 className='font-bold text-4xl font-mono text-red-400'>Doador</h2>
                        <Input className='h-[25px]' ></Input>
                        <AddDoador icon={<SquarePlus className=' text-red-400 cursor-pointer' size={32}  />} doadores={doadores} setDoadores={setDoadores} />

                    </div>
                    
                    <div className='w-fit border-2 rounded-lg'>
                        <Table className='w-fit '>
                            <TableCaption className=''>Lista dos Doadores</TableCaption>
                            <TableHeader>
                                <TableRow className='gap-2'>
                                    <TableHead className='text-center  text-red-400'>Id</TableHead>
                                    <TableHead className='text-center w-[200px] text-red-400'>Nome</TableHead>
                                    <TableHead className='text-center  text-red-400'>BI</TableHead>
                                    <TableHead className='text-center  text-red-400'>Nacionalidade</TableHead>
                                    <TableHead className='text-center w-[200px] text-red-400'>Tipo Sanguineo</TableHead>
                                    <TableHead className='text-center w-[100px]  text-red-400'>Disponiblidade</TableHead>
                                    <TableHead className='text-center text-red-400'>Peso</TableHead>
                                    <TableHead className='text-center '></TableHead>
                                    <TableHead className='text-center '></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody >
                                {doadores.map((doador) => (
                                <TableRow key={doador.id} className='gap-2'>
                                    <TableCell className='font-medium text-center' >{doador.id}</TableCell>
                                    <TableCell className='text-center w-[200px] text-xs '>{doador.nome}</TableCell>
                                    <TableCell className='text-center text-xs '>{doador.bi}</TableCell>
                                    <TableCell className='text-center w-[200px] text-xs'>{doador.nacionalidade}</TableCell>
                                    <TableCell className='text-center '>{doador.tipoSanguineo}</TableCell>
                                    <TableCell className='text-center'>
                                        {
                                        doador.disponibilidade ? <Check className='text-green-600 w-[100px] text-center cursor-pointer'/> : <Ban className='text-red-500 w-[100px] text-center cursor-pointer'/>
                                        }
                                    </TableCell>
                                    <TableCell className='text-center'>{doador.peso}</TableCell>
                                    <TableCell><EditDoador icon={<SquarePen className='text-center text-blue-600 cursor-pointer' />} doador={doador} doadores={doadores} setDoadores={setDoadores}/></TableCell>
                                    <TableCell ><Trash className='text-center text-red-500 cursor-pointer' onClick={()=>handleDelete(doador.id)} /></TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </main>
        </SidebarProvider>
    </div>
    )
}


export default page;