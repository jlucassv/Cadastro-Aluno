/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.acme.entidade;

import org.acme.controle.Aluno;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.sql.ResultSet;

/**
 *
 * @author jes73
 */
public class ManterAluno extends DAO {

    public void inserir(Aluno a) throws Exception {
        try {

            abrirBanco();
            String query = "INSERT INTO alunos(matricula, nome, turma, curso, email)"
                    + "VALUES(?,?,?,?,?)";
            pst = (PreparedStatement) con.prepareStatement(query);
            pst.setString(1, a.getMatricula());
            pst.setString(2, a.getNome());
            pst.setString(3, a.getTurma());
            pst.setString(4, a.getCurso());
            pst.setString(5, a.getEmail());
            pst.execute();
            fecharBanco();
        } catch (Exception e) {
            System.out.println("Erro " + e.getMessage());
        }
    }

    public ArrayList<Aluno> PesquisarTudo() throws Exception {
        ArrayList<Aluno> alunos = new ArrayList<Aluno>();
        try {
            abrirBanco();
            String query = "SELECT matricula, nome, turma, curso, email FROM alunos ORDER BY matricula";
            pst = (PreparedStatement) con.prepareStatement(query);
            ResultSet tr = pst.executeQuery();
            Aluno a;
            while (tr.next()) {
                a = new Aluno();
                a.setMatricula(tr.getString("matricula"));
                a.setNome(tr.getString("nome"));
                a.setTurma(tr.getString("turma"));
                a.setCurso(tr.getString("curso"));
                a.setEmail(tr.getString("email"));
                alunos.add(a);
            }
            fecharBanco();
        } catch (Exception e) {
            System.out.println("Erro " + e.getMessage());
        }
        return alunos;
    }

    public void PesquisarRegistro(Aluno a) throws Exception {
        try {
            abrirBanco();
            String query = "SELECT * FROM alunos WHERE matricula=?";
            pst = (PreparedStatement) con.prepareStatement(query);
            pst.setString(1, a.getMatricula());
            ResultSet tr = pst.executeQuery();
            if (tr.next()) {
                a.setMatricula(tr.getString("matricula"));
                a.setNome(tr.getString("nome"));
                a.setTurma(tr.getString("turma"));
                a.setCurso(tr.getString("curso"));
                a.setEmail(tr.getString("email"));
            } else {
                //  JOptionPane.showMessageDialog(null, "Nenhum resultado encontrado! ");
            }
            fecharBanco();
        } catch (Exception e) {
            System.out.println("Erro " + e.getMessage());
        }
    }

    public void editarAluno(Aluno a) throws Exception {
        abrirBanco();
        String query = "UPDATE alunos set nome = ?, turma = ?, curso = ?, email = ? where matricula=?";
        pst = (PreparedStatement) con.prepareStatement(query);
        pst.setString(1, a.getNome());
        pst.setString(2, a.getTurma());
        pst.setString(3, a.getCurso());
        pst.setString(4, a.getEmail());
        pst.setString(5, a.getMatricula());
        pst.executeUpdate();
        fecharBanco();
    }

    public void deletarAluno(Aluno a) throws Exception {
        abrirBanco();
        String query = "DELETE FROM alunos WHERE matricula=?";
        pst = (PreparedStatement) con.prepareStatement(query);
        pst.setString(1, a.getMatricula());
        pst.execute();
        fecharBanco();
    }

}
