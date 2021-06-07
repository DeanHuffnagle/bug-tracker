import {MigrationInterface, QueryRunner} from "typeorm";

export class backendRefactor1623023930905 implements MigrationInterface {
    name = 'backendRefactor1623023930905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('admin', 'projectManager', 'developer', 'submitter', 'demoAdmin', 'demoProjectManager', 'demoDeveloper', 'demoSubmitter')`);
        await queryRunner.query(`CREATE TYPE "user_userexperience_enum" AS ENUM('new', 'old')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "role" "user_role_enum" NOT NULL DEFAULT 'developer', "userExperience" "user_userexperience_enum" NOT NULL DEFAULT 'new', "password" character varying NOT NULL, "organizationId" integer, "assignedTicketsId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "joinRequestId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "organization_privacy_enum" AS ENUM('open', 'inviteOnly', 'closed')`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "ownerId" integer, "link" character varying, "privacy" "organization_privacy_enum" NOT NULL DEFAULT 'inviteOnly', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_67c515257c7a4bc221bb1857a3" UNIQUE ("ownerId"), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "organizationId" integer NOT NULL, "repositoryLink" character varying, "managerId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "ticket_priority_enum" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`CREATE TYPE "ticket_status_enum" AS ENUM('unassigned', 'inProgress', 'awaitingConfirmation', 'resolved')`);
        await queryRunner.query(`CREATE TYPE "ticket_type_enum" AS ENUM('bugOrError', 'featureRequest', 'other', 'trainingRequest')`);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, "priority" "ticket_priority_enum" NOT NULL DEFAULT 'high', "status" "ticket_status_enum" NOT NULL DEFAULT 'unassigned', "type" "ticket_type_enum" NOT NULL DEFAULT 'other', "assignedDeveloperId" integer, "projectId" integer NOT NULL, "managerId" integer, "submitterId" integer, "organizationId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "commenterId" integer NOT NULL, "ticketId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_assigned_developers_user" ("projectId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_ca5433d1df53f96c9b09fa2dc67" PRIMARY KEY ("projectId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f6ce61e9def7f8e02d703cf1c5" ON "project_assigned_developers_user" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_aff9add5d074c56afb1fc0defc" ON "project_assigned_developers_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_cf5bc479e2e0526aeed62537547" FOREIGN KEY ("joinRequestId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_67c515257c7a4bc221bb1857a39" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_33a588338bd946c9295c316d4bb" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_0028dfadf312a1d7f51656c4a9a" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_636aca2c0e6c5e56d22e40ea983" FOREIGN KEY ("assignedDeveloperId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_ff63989027d3b8a258b90ea4b96" FOREIGN KEY ("submitterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_c6f47d3e270123ccd2f16f13d29" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_b87c4da6a3ca9c54aa3e93a96f6" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_f40ca889b1d5f9da20e211f2d1f" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_60a8d223d76a792e1800218d714" FOREIGN KEY ("commenterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_7522f1f6b36fa4b1742762a17f9" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_assigned_developers_user" ADD CONSTRAINT "FK_f6ce61e9def7f8e02d703cf1c52" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_assigned_developers_user" ADD CONSTRAINT "FK_aff9add5d074c56afb1fc0defc5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_assigned_developers_user" DROP CONSTRAINT "FK_aff9add5d074c56afb1fc0defc5"`);
        await queryRunner.query(`ALTER TABLE "project_assigned_developers_user" DROP CONSTRAINT "FK_f6ce61e9def7f8e02d703cf1c52"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_7522f1f6b36fa4b1742762a17f9"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_60a8d223d76a792e1800218d714"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_f40ca889b1d5f9da20e211f2d1f"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_b87c4da6a3ca9c54aa3e93a96f6"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_c6f47d3e270123ccd2f16f13d29"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_ff63989027d3b8a258b90ea4b96"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_636aca2c0e6c5e56d22e40ea983"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_0028dfadf312a1d7f51656c4a9a"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_33a588338bd946c9295c316d4bb"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_67c515257c7a4bc221bb1857a39"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_cf5bc479e2e0526aeed62537547"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dfda472c0af7812401e592b6a61"`);
        await queryRunner.query(`DROP INDEX "IDX_aff9add5d074c56afb1fc0defc"`);
        await queryRunner.query(`DROP INDEX "IDX_f6ce61e9def7f8e02d703cf1c5"`);
        await queryRunner.query(`DROP TABLE "project_assigned_developers_user"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`DROP TYPE "ticket_type_enum"`);
        await queryRunner.query(`DROP TYPE "ticket_status_enum"`);
        await queryRunner.query(`DROP TYPE "ticket_priority_enum"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP TYPE "organization_privacy_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_userexperience_enum"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
    }

}
