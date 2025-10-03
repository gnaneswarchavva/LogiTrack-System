package com.wecp.logisticsmanagementandtrackingsystem.repository;

import com.wecp.logisticsmanagementandtrackingsystem.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
    // extended jpa repository and added custom method for finding driver by name
    public Driver findByName(String name);
}