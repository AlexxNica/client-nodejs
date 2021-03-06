/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const Constant = require('./BaseTypeConstants');
const BaseType = Constant.baseType;
const methods = {
    attribute: {
        valueType: function () { return this.txService.getValueTypeOfAttribute(this.id); },
        value: function () { return this.txService.getValue(this.id); },
        owners: function () { return this.txService.getOwners(this.id); }
    },
    attributeType: {
        create: function (value) { return this.txService.putAttribute(this.id, value); },
        attribute: function (value) { return this.txService.getAttribute(this.id, value); },
        valueType: function () { return this.txService.getValueTypeOfType(this.id); },
        regex: function (regex) {
            if (regex) return this.txService.setRegex(this.id, regex);
            else return this.txService.getRegex(this.id);
        },
    },
    concept: {
        delete: function () { return this.txService.deleteConcept(this.id); },
        isDeleted: async function () {
            const concept = await this.txService.getConcept(this.id);
            return concept === null;
        },
        isSchemaConcept: function () { return Constant.set.SCHEMA_CONCEPTS.has(this.baseType); },
        isType: function () { return Constant.set.TYPES.has(this.baseType); },
        isThing: function () { return Constant.set.THINGS.has(this.baseType); },
        isAttributeType: function () { return this.baseType === BaseType.ATTRIBUTE_TYPE; },
        isEntityType: function () { return this.baseType === BaseType.ENTITY_TYPE; },
        isRelationType: function () { return this.baseType === BaseType.RELATION_TYPE; },
        isRole: function () { return this.baseType === BaseType.ROLE; },
        isRule: function () { return this.baseType === BaseType.RULE; },
        isAttribute: function () { return this.baseType === BaseType.ATTRIBUTE; },
        isEntity: function () { return this.baseType === BaseType.ENTITY; },
        isRelation: function () { return this.baseType === BaseType.RELATION; }
    },
    entityType: {
        create: function () { return this.txService.addEntity(this.id); },
    },
    relation: {
        rolePlayersMap: async function () { return this.txService.rolePlayersMap(this.id); },
        rolePlayers: async function (...roles) { return this.txService.rolePlayers(this.id, roles); },
        assign: function (role, thing) { return this.txService.setRolePlayer(this.id, role, thing); },
        unassign: function (role, thing) { return this.txService.unsetRolePlayer(this.id, role, thing); }
    },
    relationType: {
        create: function () { return this.txService.addRelation(this.id); },
        relates: function (role) { return this.txService.setRelatedRole(this.id, role); },
        roles: function () { return this.txService.getRelatedRoles(this.id); },
        unrelate: function (role) { return this.txService.unsetRelatedRole(this.id, role); }
    },
    role: {
        relations: function () { return this.txService.getRelationTypesThatRelateRole(this.id); },
        players: function () { return this.txService.getTypesThatPlayRole(this.id); },
    },
    rule: {
        getWhen: function () { return this.txService.getWhen(this.id); },
        getThen: function () { return this.txService.getThen(this.id); }
    },
    schemaConcept: {
        label: function (label) {
            if (label) return this.txService.setLabel(this.id, label);
            else return this.txService.getLabel(this.id);
        },
        subs: function () { return this.txService.subs(this.id); },
        sups: function () { return this.txService.sups(this.id); },
        sup: function (type) {
            if (type) return this.txService.setSup(this.id, type);
            else return this.txService.getSup(this.id);
        }
    },
    thing: {
        isInferred: function () { return this.txService.isInferred(this.id); },
        type: function () { return this.txService.getDirectType(this.id); },
        relations: function (...roles) { return this.txService.getRelationsByRoles(this.id, roles); },
        roles: function () { return this.txService.getRolesPlayedByThing(this.id); },
        attributes: function (...attributes) { return this.txService.getAttributesByTypes(this.id, attributes); },
        keys: function (...types) { return this.txService.getKeysByTypes(this.id, types); },
        has: function (attribute) { return this.txService.setAttribute(this.id, attribute); },
        unhas: function (attribute) { return this.txService.unsetAttribute(this.id, attribute); }
    },
    type: {
        isAbstract: function (bool) {
            if (bool != null) return this.txService.setAbstract(this.id, bool);
            else return this.txService.isAbstract(this.id);
        },
        plays: function (role) { return this.txService.setRolePlayedByType(this.id, role); },
        playing: function () { return this.txService.getRolesPlayedByType(this.id); },
        key: function (attributeType) { return this.txService.setKeyType(this.id, attributeType); },
        has: function (attributeType) { return this.txService.setAttributeType(this.id, attributeType); },
        attributes: function () { return this.txService.getAttributeTypes(this.id); },
        keys: function () { return this.txService.getKeyTypes(this.id); },
        instances: function () { return this.txService.instances(this.id); },
        unplay: function (role) { return this.txService.unsetRolePlayedByType(this.id, role); },
        unhas: function (attributeType) { return this.txService.unsetAttributeType(this.id, attributeType); },
        unkey: function (attributeType) { return this.txService.unsetKeyType(this.id, attributeType); },
    }
}

module.exports = methods;