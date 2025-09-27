package com.wecp.logisticsmanagementandtrackingsystem.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
public class Driver {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;

     private String name;
     private String email;

     @OneToOne
     @JoinColumn(name = "user_id")
     private Long userId;

     @OneToMany(mappedBy = "driver")
     @JsonIgnore
     private List<Cargo> assignedCargos;

     public Long getId() {
          return id;
     }

     public void setId(Long id) {
          this.id = id;
     }

     public String getName() {
          return name;
     }

     public void setName(String name) {
          this.name = name;
     }

     public String getEmail() {
          return email;
     }

     public void setEmail(String email) {
          this.email = email;
     }

     public Long getUserId() {
          return userId;
     }

     public void setUserId(Long userId) {
          this.userId = userId;
     }

     public List<Cargo> getAssignedCargos() {
          return assignedCargos;
     }

     public void setAssignedCargos(List<Cargo> assignedCargos) {
          this.assignedCargos = assignedCargos;
     }

     





}
