package propManageProject.accountService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propManageProject.accountService.entity.AccountEntity;

import java.util.Optional;
import java.util.UUID;

public interface AccountRepository extends JpaRepository<AccountEntity, UUID> {
    Optional<AccountEntity> findAccountByUsername(String username);
    Optional<AccountEntity> findAccountByEmail(String email);
    Optional<AccountEntity> findAccountEntityByRefreshToken(String refreshToken);
    Optional<AccountEntity> findAccountEntityByUuid(UUID id);
    AccountEntity[] findAllByManagerIdAndAccountType(UUID managerId, String accountType);

}