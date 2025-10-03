
package com.wecp.logisticsmanagementandtrackingsystem.service;

import com.wecp.logisticsmanagementandtrackingsystem.entity.Cargo;
import com.wecp.logisticsmanagementandtrackingsystem.entity.Driver;
import com.wecp.logisticsmanagementandtrackingsystem.entity.User;
import com.wecp.logisticsmanagementandtrackingsystem.exceptions.CargosNotFoundException;
import com.wecp.logisticsmanagementandtrackingsystem.exceptions.DriverNotFoundException;
import com.wecp.logisticsmanagementandtrackingsystem.repository.CargoRepository;
import com.wecp.logisticsmanagementandtrackingsystem.repository.DriverRepository;
import com.wecp.logisticsmanagementandtrackingsystem.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class DriverService {

    // Dependency Injections
    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private CargoRepository cargoRepository;

    @Autowired
    private UserRepository userRepository;

    public Driver createDriver(Driver driver) {
        // adding driver to database and return driver
        return driverRepository.save(driver);
    }

    public List<Driver> getAllDrivers() {
        // returning list of drivers from database
        return driverRepository.findAll();

    }

    


   public boolean updateCargoStatus(Long cargoId, String newStatus) {
        // update cargo status in database
        Cargo cargo = cargoRepository.findById(cargoId).orElseThrow(() -> new EntityNotFoundException(cargoId + " not found!!"));

        cargo.setStatus(newStatus);
        cargoRepository.save(cargo);
        return true;

    }

   public List<Cargo> viewDriverCargos(Long driverId) throws CargosNotFoundException, DriverNotFoundException {
       // Directly fetch driver by ID
       Driver driver = driverRepository.findById(driverId)
               .orElseThrow(() -> new DriverNotFoundException("No driver found with ID: " + driverId));
   
       List<Cargo> cargos = cargoRepository.findByDriverId(driver.getId());
       if (cargos == null || cargos.isEmpty()) {
           throw new CargosNotFoundException("No cargos associated with this driver");
       }
   
       return cargos;
   }

}