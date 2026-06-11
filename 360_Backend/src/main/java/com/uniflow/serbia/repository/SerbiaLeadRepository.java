package com.uniflow.serbia.repository;

import com.uniflow.serbia.entity.SerbiaLead;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

/**
 * Reactive repository for SerbiaLead entity.
 */
@Repository
public interface SerbiaLeadRepository extends R2dbcRepository<SerbiaLead, UUID> {

    /**
     * Find all leads for a specific student, ordered by submission date descending.
     */
    @Query("SELECT * FROM serbia_leads WHERE student_id = :studentId ORDER BY submitted_at DESC")
    Flux<SerbiaLead> findByStudentId(@Param("studentId") Long studentId);

    /**
     * Find all leads by status, ordered by submission date descending.
     */
    @Query("SELECT * FROM serbia_leads WHERE status = :status ORDER BY submitted_at DESC")
    Flux<SerbiaLead> findByStatus(@Param("status") String status);

    /**
     * Find all leads ordered by submission date descending (for admin).
     */
    @Query("SELECT * FROM serbia_leads ORDER BY submitted_at DESC")
    Flux<SerbiaLead> findAllOrdered();

    /**
     * Count leads by status.
     */
    @Query("SELECT COUNT(*) FROM serbia_leads WHERE status = :status")
    Mono<Long> countByStatus(@Param("status") String status);
}
