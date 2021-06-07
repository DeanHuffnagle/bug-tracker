import {MigrationInterface, QueryRunner} from "typeorm";

export class refactor1623081822930 implements MigrationInterface {
    name = 'refactor1623081822930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "user_role_enum" RENAME TO "user_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('admin', 'projectManager', 'developer', 'submitter', 'demoAdmin', 'demoProjectManager', 'demoDeveloper', 'demoSubmitter')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "user_role_enum" USING "role"::"text"::"user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'developer'`);
        await queryRunner.query(`DROP TYPE "user_role_enum_old"`);
        await queryRunner.query(`ALTER TYPE "user_experience_enum" RENAME TO "user_experience_enum_old"`);
        await queryRunner.query(`CREATE TYPE "user_experience_enum" AS ENUM('new', 'old')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "experience" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "experience" TYPE "user_experience_enum" USING "experience"::"text"::"user_experience_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "experience" SET DEFAULT 'new'`);
        await queryRunner.query(`DROP TYPE "user_experience_enum_old"`);
        await queryRunner.query(`ALTER TYPE "organization_privacy_enum" RENAME TO "organization_privacy_enum_old"`);
        await queryRunner.query(`CREATE TYPE "organization_privacy_enum" AS ENUM('open', 'inviteOnly', 'closed')`);
        await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "privacy" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "privacy" TYPE "organization_privacy_enum" USING "privacy"::"text"::"organization_privacy_enum"`);
        await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "privacy" SET DEFAULT 'inviteOnly'`);
        await queryRunner.query(`DROP TYPE "organization_privacy_enum_old"`);
        await queryRunner.query(`ALTER TYPE "ticket_priority_enum" RENAME TO "ticket_priority_enum_old"`);
        await queryRunner.query(`CREATE TYPE "ticket_priority_enum" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "priority" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "priority" TYPE "ticket_priority_enum" USING "priority"::"text"::"ticket_priority_enum"`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "priority" SET DEFAULT 'high'`);
        await queryRunner.query(`DROP TYPE "ticket_priority_enum_old"`);
        await queryRunner.query(`ALTER TYPE "ticket_status_enum" RENAME TO "ticket_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "ticket_status_enum" AS ENUM('unassigned', 'inProgress', 'awaitingConfirmation', 'resolved')`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "status" TYPE "ticket_status_enum" USING "status"::"text"::"ticket_status_enum"`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "status" SET DEFAULT 'unassigned'`);
        await queryRunner.query(`DROP TYPE "ticket_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "ticket_type_enum" RENAME TO "ticket_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "ticket_type_enum" AS ENUM('bugOrError', 'featureRequest', 'other', 'trainingRequest')`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "type" TYPE "ticket_type_enum" USING "type"::"text"::"ticket_type_enum"`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "type" SET DEFAULT 'other'`);
        await queryRunner.query(`DROP TYPE "ticket_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "ticket_type_enum_old" AS ENUM('bugOrError', 'featureRequest', 'other', 'trainingRequest')`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "type" TYPE "ticket_type_enum_old" USING "type"::"text"::"ticket_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "type" SET DEFAULT 'other'`);
        await queryRunner.query(`DROP TYPE "ticket_type_enum"`);
        await queryRunner.query(`ALTER TYPE "ticket_type_enum_old" RENAME TO "ticket_type_enum"`);
        await queryRunner.query(`CREATE TYPE "ticket_status_enum_old" AS ENUM('unassigned', 'inProgress', 'awaitingConfirmation', 'resolved')`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "status" TYPE "ticket_status_enum_old" USING "status"::"text"::"ticket_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "status" SET DEFAULT 'unassigned'`);
        await queryRunner.query(`DROP TYPE "ticket_status_enum"`);
        await queryRunner.query(`ALTER TYPE "ticket_status_enum_old" RENAME TO "ticket_status_enum"`);
        await queryRunner.query(`CREATE TYPE "ticket_priority_enum_old" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "priority" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "priority" TYPE "ticket_priority_enum_old" USING "priority"::"text"::"ticket_priority_enum_old"`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "priority" SET DEFAULT 'high'`);
        await queryRunner.query(`DROP TYPE "ticket_priority_enum"`);
        await queryRunner.query(`ALTER TYPE "ticket_priority_enum_old" RENAME TO "ticket_priority_enum"`);
        await queryRunner.query(`CREATE TYPE "organization_privacy_enum_old" AS ENUM('open', 'inviteOnly', 'closed')`);
        await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "privacy" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "privacy" TYPE "organization_privacy_enum_old" USING "privacy"::"text"::"organization_privacy_enum_old"`);
        await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "privacy" SET DEFAULT 'inviteOnly'`);
        await queryRunner.query(`DROP TYPE "organization_privacy_enum"`);
        await queryRunner.query(`ALTER TYPE "organization_privacy_enum_old" RENAME TO "organization_privacy_enum"`);
        await queryRunner.query(`CREATE TYPE "user_experience_enum_old" AS ENUM('new', 'old')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "experience" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "experience" TYPE "user_experience_enum_old" USING "experience"::"text"::"user_experience_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "experience" SET DEFAULT 'new'`);
        await queryRunner.query(`DROP TYPE "user_experience_enum"`);
        await queryRunner.query(`ALTER TYPE "user_experience_enum_old" RENAME TO "user_experience_enum"`);
        await queryRunner.query(`CREATE TYPE "user_role_enum_old" AS ENUM('admin', 'projectManager', 'developer', 'submitter', 'demoAdmin', 'demoProjectManager', 'demoDeveloper', 'demoSubmitter')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "user_role_enum_old" USING "role"::"text"::"user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'developer'`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`ALTER TYPE "user_role_enum_old" RENAME TO "user_role_enum"`);
    }

}
