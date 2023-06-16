package propManagementProject.emailService.emailService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import propManagementProject.emailService.emailService.entity.request.SavedEmailEntity;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SavedEmailRepository extends JpaRepository<SavedEmailEntity, UUID> {
    Optional<SavedEmailEntity> findSavedEmailEntityByRecipient(String recipient);
}

