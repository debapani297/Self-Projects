package com.bill.billingapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bill.billingapp.dto.AdminDto;
import com.bill.billingapp.dto.CompanyUserDto;
import com.bill.billingapp.dto.CompanyUserDtoReceivable;
import com.bill.billingapp.entity.Company;
import com.bill.billingapp.entity.CompanyUser;
import com.bill.billingapp.entity.Roles;
import com.bill.billingapp.entity.Status;
import com.bill.billingapp.entity.User;
import com.bill.billingapp.repository.CompanyRepo;
import com.bill.billingapp.repository.CompanyUserRepo;
import com.bill.billingapp.repository.RolesRepo;
import com.bill.billingapp.utilities.CommonResponse;

@Service
public class CompanyUserService {

	@Autowired
	private CompanyUserRepo companyUserRepo;

	@Autowired
	private RolesRepo rolesRepo;

	@Autowired
	private CompanyRepo companyRepo;

	public CommonResponse createUser(CompanyUserDto companyUserDto) {
		try {

			CompanyUser user = new CompanyUser();
			user.setPassword(companyUserDto.getPassword());
			user.setUserName(companyUserDto.getUserName());
			user.setName(companyUserDto.getName());
			user.setStatus(Status.ACTIVE);

			Roles role = rolesRepo.findById(companyUserDto.getRoleId()).get();

			Company company = companyRepo.findById(companyUserDto.getCompanyId()).get();

			user.setCompany(company);
			user.setRoles(role);

			companyUserRepo.save(user);

			return new CommonResponse<CompanyUser>(user, 201);

		} catch (Exception ex) {
			return new CommonResponse<String>(ex.getMessage(), 500);
		}
	}

	public CommonResponse updateUser(CompanyUserDto companyUserDto) {
		try {

			CompanyUser user = new CompanyUser();
			user.setUserId(companyUserDto.getUserId());
			user.setPassword(companyUserDto.getPassword());
			user.setUserName(companyUserDto.getUserName());
			user.setName(companyUserDto.getName());
			user.setStatus(companyUserDto.getStatus());

			Roles role = rolesRepo.findById(companyUserDto.getRoleId()).get();

			Company company = companyRepo.findById(companyUserDto.getCompanyId()).get();

			user.setCompany(company);
			user.setRoles(role);

			user = companyUserRepo.save(user);
			CompanyUserDtoReceivable userDto = new CompanyUserDtoReceivable();

			userDto.setCompanyId(user.getCompany().getCompanyId());
			userDto.setCompanyName(user.getCompany().getCompanyName());
			userDto.setCompanytype(user.getCompany().getCompanyType());
			userDto.setLocation(user.getCompany().getCompanyLocation());
			userDto.setName(user.getName());
			userDto.setUserId(user.getUserId());
			userDto.setUserName(user.getUserName());
			userDto.setStatus(user.getStatus());
			userDto.setRoleName(user.getRoles().getRoleName());

			return new CommonResponse<CompanyUserDtoReceivable>(userDto, 201);

		} catch (Exception ex) {
			return new CommonResponse<String>(ex.getMessage(), 500);
		}
	}

	public CommonResponse disableUser(long userId) {
		try {

			Optional<CompanyUser> userOp = companyUserRepo.findById(userId);
			if (userOp.isPresent()) {

				userOp.get().setStatus(Status.IN_ACTIVE);
				CompanyUser user = companyUserRepo.save(userOp.get());

				CompanyUserDtoReceivable userDto = new CompanyUserDtoReceivable();

				userDto.setCompanyId(user.getCompany().getCompanyId());
				userDto.setCompanyName(user.getCompany().getCompanyName());
				userDto.setCompanytype(user.getCompany().getCompanyType());
				userDto.setLocation(user.getCompany().getCompanyLocation());
				userDto.setName(user.getName());
				userDto.setUserId(user.getUserId());
				userDto.setUserName(user.getUserName());
				userDto.setStatus(user.getStatus());
				userDto.setRoleName(user.getRoles().getRoleName());

				return new CommonResponse<CompanyUserDtoReceivable>(userDto, 201);
			} else
				return new CommonResponse<String>("User not found", 404);

		} catch (Exception ex) {
			return new CommonResponse<String>(ex.getMessage(), 500);
		}
	}

	public CommonResponse enableUser(long userId) {
		try {

			Optional<CompanyUser> userOp = companyUserRepo.findById(userId);
			if (userOp.isPresent()) {

				if (userOp.get().getCompany().getStatus().equals(Status.ACTIVE)) {
					userOp.get().setStatus(Status.ACTIVE);
					CompanyUser user = companyUserRepo.save(userOp.get());

					CompanyUserDtoReceivable userDto = new CompanyUserDtoReceivable();

					userDto.setCompanyId(user.getCompany().getCompanyId());
					userDto.setCompanyName(user.getCompany().getCompanyName());
					userDto.setCompanytype(user.getCompany().getCompanyType());
					userDto.setLocation(user.getCompany().getCompanyLocation());
					userDto.setName(user.getName());
					userDto.setUserId(user.getUserId());
					userDto.setUserName(user.getUserName());
					userDto.setStatus(user.getStatus());
					userDto.setRoleName(user.getRoles().getRoleName());

					return new CommonResponse<CompanyUserDtoReceivable>(userDto, 201);
				} else
					return new CommonResponse<String>("Company Not Active", 403);

			} else
				return new CommonResponse<String>("User not found", 404);

		} catch (Exception ex) {
			return new CommonResponse<String>(ex.getMessage(), 500);
		}
	}

//	public CommonResponse getCompanyUsers(){
//		try {
//			 Roles vroles=rolesRepo.findByRoleName("Vendor");
//			 List<CompanyUser> vendors=companyUserRepo.findByRoles(vroles);
//			 
//			 Roles croles=rolesRepo.findByRoleName("Client");
//			 List<CompanyUser> clients=companyUserRepo.findByRoles(croles);
//			 
//			 vendors.addAll(clients);
//			 
//			if(!vendors.isEmpty() && vendors!=null) {
//				return new CommonResponse<List<CompanyUser>>(vendors, 200);
//			}
//			return new CommonResponse<String>("No Company Users Present", 404);
//			
//		}catch(Exception ex) {
//			return new CommonResponse<String> (ex.getMessage(), 500);
//		}
//		
//	}
//	

	private List<CompanyUserDtoReceivable> companyUsers = new ArrayList<>(); // global variable

	public CommonResponse getCompanyUsers() {
		try {
			companyUsers.clear();
			List<Roles> roles = rolesRepo.findByCompanyType("Vendor");
			roles.addAll(rolesRepo.findByCompanyType("Client"));

			List<CompanyUserDtoReceivable> companyUsers = new ArrayList<>();
			for (Roles role : roles) {
				List<CompanyUser> roleUsers = companyUserRepo.findByRoles(role);
				if (!roleUsers.isEmpty() && roleUsers != null) {
					roleUsers.stream().forEach(user -> {
						CompanyUserDtoReceivable userDto = new CompanyUserDtoReceivable();

						userDto.setCompanyId(user.getCompany().getCompanyId());
						userDto.setCompanyName(user.getCompany().getCompanyName());
						userDto.setCompanytype(user.getCompany().getCompanyType());
						userDto.setLocation(user.getCompany().getCompanyLocation());
						userDto.setName(user.getName());
						userDto.setUserId(user.getUserId());
						userDto.setUserName(user.getUserName());
						userDto.setStatus(user.getStatus());
						userDto.setRoleName(user.getRoles().getRoleName());

						companyUsers.add(userDto);
					});

				}

			}

			if (!companyUsers.isEmpty() && companyUsers != null) {
				return new CommonResponse<List<CompanyUserDtoReceivable>>(companyUsers, 200);
			}
			return new CommonResponse<String>("No Company Users Present", 404);

		} catch (Exception ex) {
			return new CommonResponse<String>(ex.getMessage(), 500);
		}

	}

	public CommonResponse findByUserName(String userName) {
		try {
			CompanyUser user = companyUserRepo.findByUserName(userName);
			if (user != null) {
				return new CommonResponse<CompanyUser>(user, 200);
			}
			return new CommonResponse<String>("User Not Found", 404);

		} catch (Exception ex) {
			return new CommonResponse<String>(ex.getMessage(), 500);
		}
	}

	private List<CompanyUserDtoReceivable> activeCompanyUsers = new ArrayList<>(); // global variable

	public CommonResponse getActiveCompanyUsers() {
		try {
			activeCompanyUsers.clear();
			List<Roles> roles = rolesRepo.findByCompanyType("Vendor");
			roles.addAll(rolesRepo.findByCompanyType("Client"));

			List<CompanyUserDtoReceivable> activeCompanyUsers = new ArrayList<>();
			for (Roles role : roles) {
				List<CompanyUser> roleUsers = companyUserRepo.findByRoles(role);
				if (!roleUsers.isEmpty() && roleUsers != null) {
					//roleUsers.stream().forEach(user -> {
					roleUsers.stream().filter(user -> user.getStatus().equals(Status.ACTIVE)).forEach(user -> {
						CompanyUserDtoReceivable userDto = new CompanyUserDtoReceivable();

						userDto.setCompanyId(user.getCompany().getCompanyId());
						userDto.setCompanyName(user.getCompany().getCompanyName());
						userDto.setCompanytype(user.getCompany().getCompanyType());
						userDto.setLocation(user.getCompany().getCompanyLocation());
						userDto.setName(user.getName());
						userDto.setUserId(user.getUserId());
						userDto.setUserName(user.getUserName());
						userDto.setStatus(user.getStatus());
						userDto.setRoleName(user.getRoles().getRoleName());

						activeCompanyUsers.add(userDto);
					});

				}

			}

			if (!activeCompanyUsers.isEmpty() && activeCompanyUsers != null) {
				return new CommonResponse<List<CompanyUserDtoReceivable>>(activeCompanyUsers, 200);
			}
			return new CommonResponse<String>("No Company Users Present", 404);

		} catch (Exception ex) {
			return new CommonResponse<String>(ex.getMessage(), 500);
		}

	}
	
private List<CompanyUserDtoReceivable> disableCompanyUsers =new ArrayList<>(); //global variable
	
	public CommonResponse getDisableCompanyUsers(){
		try {
			disableCompanyUsers.clear();
			 List<Roles> roles=rolesRepo.findByCompanyType("Vendor");
			 roles.addAll(rolesRepo.findByCompanyType("Client"));
			 
			 List<CompanyUserDtoReceivable> disableCompanyUsers =new ArrayList<>();
			 for (Roles role : roles) {
				 List<CompanyUser> roleUsers = companyUserRepo.findByRoles(role);
				 if(!roleUsers.isEmpty() && roleUsers!=null) {
//					 	roleUsers.stream().forEach(user -> {
					 roleUsers.stream().filter(user -> user.getStatus().equals(Status.IN_ACTIVE)).forEach(user -> {
					 		CompanyUserDtoReceivable userDto= new CompanyUserDtoReceivable();
					 		
					 		userDto.setCompanyId(user.getCompany().getCompanyId());
					 		userDto.setCompanyName(user.getCompany().getCompanyName());
					 		userDto.setCompanytype(user.getCompany().getCompanyType());
					 		userDto.setLocation(user.getCompany().getCompanyLocation());
					 		userDto.setName(user.getName());
					 		userDto.setUserId(user.getUserId());
					 		userDto.setUserName(user.getUserName());
					 		userDto.setStatus(user.getStatus());
					 		userDto.setRoleName(user.getRoles().getRoleName());
					 		
					 		disableCompanyUsers.add(userDto);
					 	});
						
					}
				
			}
			 
			if(!disableCompanyUsers.isEmpty() && disableCompanyUsers!=null) {
				return new CommonResponse<List<CompanyUserDtoReceivable>>(disableCompanyUsers, 200);
			}
			return new CommonResponse<String>("No Company Users Present", 404);
			
		}catch(Exception ex) {
			return new CommonResponse<String> (ex.getMessage(), 500);
		}
		
	}
	
	

}
