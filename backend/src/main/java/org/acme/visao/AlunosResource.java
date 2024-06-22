
package org.acme.visao;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Set;

import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import java.util.ArrayList;
// import jakarta.ws.rs.Consumes;

import org.acme.controle.Aluno;

import org.acme.entidade.ManterAluno;

@Path("/aluno")
public class AlunosResource {

    private Set<Aluno> alunos = Collections.newSetFromMap(Collections.synchronizedMap(new LinkedHashMap<>()));

    @GET
    public ArrayList<Aluno> list() throws Exception {

        alunos.removeAll(alunos);

        Aluno a = new Aluno();
        ManterAluno pesquisa = new ManterAluno();

        ArrayList<Aluno> todosAlunos = pesquisa.PesquisarTudo();
        System.err.println(todosAlunos);
        return todosAlunos;
    }

    @GET
    @Path("/{matricula}")
    public Aluno getAluno(@PathParam("matricula") String matricula) throws Exception {
        ManterAluno dao = new ManterAluno();
        Aluno mat = new Aluno();
        
        mat.setMatricula(matricula);
        
        dao.PesquisarRegistro(mat);
        
        return mat;
    }

    @POST
    public Aluno add(Aluno aluno) throws Exception {
        ManterAluno dao = new ManterAluno();
        dao.inserir(aluno);
        
        return aluno;
    }

    @DELETE
    @Path("/{matricula}")
    public void delete(@PathParam("matricula") String matricula) throws Exception {
        ManterAluno dao = new ManterAluno();
        Aluno aluno = new Aluno();
                
        aluno.setMatricula(matricula);
        dao.deletarAluno(aluno);
    }

    @PUT
    @Path("/{matricula}")
    public Aluno put(Aluno aluno, @PathParam("matricula") String matricula) throws Exception {
        ManterAluno dao = new ManterAluno();
        aluno.setMatricula(matricula);
        dao.editarAluno(aluno);
        
        return aluno;
    }
}
