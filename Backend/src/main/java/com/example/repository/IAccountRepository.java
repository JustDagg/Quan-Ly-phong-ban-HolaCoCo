package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.dto.SignupDTO;
import com.example.entity.Account;

public interface IAccountRepository extends JpaRepository<Account, Short> , JpaSpecificationExecutor<Account>{
	public Account findByUsername(String username);
	
	boolean existsByUsername(String username);

	@Modifying
	@Transactional
	@Query("DELETE FROM Account WHERE id IN(:ids)")
	void deleteByIds(@Param("ids") List<Integer> ids);

	public Account save(SignupDTO signup);
}
