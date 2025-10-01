
  package com.wecp.logisticsmanagementandtrackingsystem.repository;
  
  
  import com.wecp.logisticsmanagementandtrackingsystem.entity.Cargo;
  import org.springframework.data.jpa.repository.JpaRepository;
  import org.springframework.data.jpa.repository.Query;
  import org.springframework.stereotype.Repository;
  
  import java.util.List;
  
  @Repository
  public interface CargoRepository extends JpaRepository<Cargo,Long> {
      List<Cargo> findByBusinessId(Long businessId);
      List<Cargo> findByDriverId(Long driverId);
  
  }
   
