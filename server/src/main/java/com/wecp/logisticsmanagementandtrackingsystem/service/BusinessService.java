package com.wecp.logisticsmanagementandtrackingsystem.service;

import com.wecp.logisticsmanagementandtrackingsystem.entity.Business;
import com.wecp.logisticsmanagementandtrackingsystem.repository.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusinessService {
    //Dependency Injection
    @Autowired
    private BusinessRepository businessRepository;

    public Business registerBusiness(Business business) {
        // save business to database
        return this.businessRepository.save(business);
    }
}